import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Mail, Phone, MapPin, Send, MessageSquare } from "lucide-react"
import { Button } from "../components/ui/button"
import { Textarea } from "../components/ui/textarea"
import { useForm } from "react-hook-form"
import Input from "../components/Input"
import { useMutation } from "@tanstack/react-query"
import api from "../api/axios"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

type contact_props = {
  name: string;
  email: string,
  subject: string,
  textarea: string
}

export default function ContactUsPage() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [isSubmitted , setIsSubmitted] = useState<boolean>(false)
  const {  control, handleSubmit , formState : {isSubmitting}} = useForm<contact_props>();

  const mutationFn = useMutation({
    mutationFn : async (data : contact_props)=>{
      const response = await api.post('/', {data});
      if(response && response.data){
        return response.data
      }
    },
    onSuccess : (data)=>{
      console.log("success" , data)
      setIsSubmitted(true)
    },
    onError : (err)=>{
      console.error("error when sending the email " , err)
    }
  })

  return (
    <section id="get_in_touch" className="container mx-auto px-4 relative mt-14 mb-10" ref={ref}>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="max-w-6xl mx-auto">
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-montserrat font-bold mb-4">Get In Touch</h2>
          <div className="h-2 w-32 bg-blue-500 mx-auto rounded-full"></div>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Have a project in mind or want to discuss a potential collaboration? I'd love to hear from you. Fill out the
            form below or reach out directly.
          </p>
        </motion.div>

        {/* side information  */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div variants={itemVariants} className="space-y-8">
            <h3 className="text-2xl font-bold">Contact Information</h3>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Email</h4>
                  <p
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    farhansahabzada3@gmail.com
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Phone</h4>
                  <p className="text-muted-foreground hover:text-primary transition-colors">
                    +92 3249232442
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Location</h4>
                  <p className="text-muted-foreground">Pakistan,Sindh, Karachi</p>
                </div>
              </div>
            </div>

            <div className="h-64 md:h-80 relative rounded-lg overflow-hidden">

            </div>
          </motion.div>

          {/* inputs */}
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-bold mb-6">Send a Message</h3>
            {isSubmitted ? (
              <div className="bg-primary/10 rounded-lg p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-6">
                  <Send className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Message Sent!</h3>
                <p className="text-muted-foreground mb-6">
                  Thank you for reaching out. I'll get back to you as soon as possible.
                </p>
                <Button className="rounded-full px-6" onClick={()=> setIsSubmitted(false)}>
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit((data :contact_props)=> mutationFn.mutate(data))} 
              className="space-y-6">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Input<contact_props>
                      label="Name"
                      control={control}
                      name="name"
                      placeholder="Name"
                      className="rounded-lg"
                    />
                  </div>
                  <div className="space-y-2">
                    <Input<contact_props>
                      label="Email"
                      control={control}
                      name="email"
                      placeholder="Email"
                      className="rounded-lg"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Input<contact_props>
                    label="Subject"
                    control={control}
                    placeholder="Subject"
                    name="subject"
                  />
                </div>

                <div className="space-y-2">
                  <Input
                    name="textarea"
                    placeholder="Message"
                    control={control}
                    label="Message"
                    className="rounded-lg h-20"
                  />
                </div>

                <Button type="submit" disabled={isSubmitting} className="rounded-full px-6">
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
