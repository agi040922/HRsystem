"use client"

import Link from "next/link"
import { FileText } from "lucide-react"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { getFeaturedPosts } from "@/lib/board"
import type { BoardPost } from "@/lib/supabase"
import { useTranslations } from 'next-intl'
import NewsletterGridContent from './newsletter-grid-content'

export default function NewsNewsletterSection() {
  const [featuredPosts, setFeaturedPosts] = useState<BoardPost[]>([])
  const [loading, setLoading] = useState(true)
  const t = useTranslations()
  const tBoard = useTranslations('board')
  const tNewsletter = useTranslations('newsletter')

  useEffect(() => {
    async function loadFeaturedPosts() {
      try {
        const { posts } = await getFeaturedPosts(3)
        setFeaturedPosts(posts)
      } catch (error) {
        console.error('Failed to load featured posts:', error)
      } finally {
        setLoading(false)
      }
    }

    loadFeaturedPosts()
  }, [])

  return (
    <section id="latest-news-and-newsletter" className="w-full py-6 sm:py-8 md:py-12 bg-white">
      <div className="container-fluid max-w-7xl px-4">
        
        {/* 1:1 그리드 레이아웃 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* 공지사항 영역 (1/2) */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex items-center mb-6">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                  {tBoard('title')}
                </h3>
                <div className="flex-1 ml-8">
                  <Link href="/board" className="text-sm text-gray-500 hover:text-primary transition-colors">
                    {tBoard('moreLink')}
                  </Link>
                </div>
              </div>
              
              {/* 구분선 */}
              <div className="w-full h-px bg-gray-200 mb-6"></div>
        
              {loading ? (
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <div key={n} className="animate-pulse flex items-center justify-between py-3">
                      <div className="flex-1">
                        <div className="h-4 bg-slate-200 rounded w-3/4 mb-2"></div>
                        <div className="h-3 bg-slate-200 rounded w-1/4"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : featuredPosts.length > 0 ? (
                <div className="space-y-4">
                  {featuredPosts.map((post, index) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Link href={`/board/${post.slug}`}>
                        <div className="group py-3 border-b border-gray-100 hover:border-primary/30 transition-colors">
                          <div className="flex items-center justify-between">
                            <h4 className="text-base font-medium text-gray-900 group-hover:text-primary transition-colors duration-200 line-clamp-1 flex-1 mr-4">
                              {post.title}
                            </h4>
                            <div className="text-sm text-gray-500 whitespace-nowrap">
                              {new Date(post.published_at).toLocaleDateString('ko-KR', {
                                year: '2-digit',
                                month: '2-digit',
                                day: '2-digit'
                              })}
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-3">
                    <FileText className="w-6 h-6 text-gray-400" />
                  </div>
                  <p className="text-gray-500 text-sm">{tBoard('noNotices')}</p>
                </div>
              )}
            </motion.div>
          </div>
        
        
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="flex items-center mb-6">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                  {tNewsletter('fairNewsletter')}
                </h3>
                <div className="flex-1 ml-8">
                  <Link href="/services" className="text-sm text-gray-500 hover:text-primary transition-colors">
                    {tNewsletter('moreLink')}
                  </Link>
                </div>
              </div>
              
              {/* 구분선 */}
              <div className="w-full h-px bg-gray-200 mb-6"></div>
              
              <NewsletterGridContent />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
