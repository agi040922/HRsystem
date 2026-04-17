"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ExternalLink } from "lucide-react"
import { useTranslations } from 'next-intl'

const CRM_LOGIN_URL = "https://efm.fairhr.net"

export default function CtaSection() {
  const tCta = useTranslations('cta')

  return (
    <section id="contact-cta" className="w-full py-6 sm:py-8 md:py-12 bg-slate-50">
      <div className="container-fluid max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">
            {tCta('expertHelp')}
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-3xl mx-auto mb-6 sm:mb-8">
            {tCta('contactNow')}
            <br />
            {tCta('phoneConsultation')}{" "}
            <a href="tel:02-387-9869" className="text-primary hover:underline font-medium">
              02-387-9869
            </a>
          </p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <Link href="/contact">
              <Button size="lg" className="px-8 py-3">
                {tCta('onlineConsultation')}
              </Button>
            </Link>
            <a href={CRM_LOGIN_URL} target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="px-8 py-3 gap-1.5">
                {tCta('crmLogin')}
                <ExternalLink className="h-4 w-4" />
              </Button>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
