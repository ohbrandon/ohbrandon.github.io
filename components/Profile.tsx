'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { Mail, Phone, Linkedin, Github } from 'lucide-react'
import Image from 'next/image'

const contactInfo = {
  name: "Brandon Ayers",
  title: "Phone Nerd | Movie Snob | Academic Delinquent",
  email: "brandon @ email dot com",
  phone: "321-323-XXXX",
  linkedin: "linkedin.com/in/brandonayerss",
  resume: "PDF Download"
}

const focusPoints = [
  "Mobile Product Strategy",
  "Relationship Management",
  "Product/Feature Expansion",
  "Permission Exploitation",
  "Mobile App Development",
  "Hacking and Experimentation"
  "Sub Bullets?"
]

interface TypewriterTextProps {
  text: string;
  onComplete: () => void;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({ text, onComplete }) => {
  const [displayedText, setDisplayedText] = useState('')
  const intervalRef = useRef<number | null>(null)

  useEffect(() => {
    let i = 0
    const typeNextChar = () => {
      if (i < text.length) {
        setDisplayedText(prev => prev + text[i])
        i++
      } else {
        if (intervalRef.current) {
          clearInterval(intervalRef.current)
        }
        onComplete()
      }
    }

    intervalRef.current = window.setInterval(typeNextChar, 100) // Slowed down to 100ms per character

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [text, onComplete])

  return <span>{displayedText}</span>
}

export default function Profile() {
  const [currentFocusIndex, setCurrentFocusIndex] = useState(0)

  const handleFocusItemComplete = () => {
    setCurrentFocusIndex(prevIndex => 
      prevIndex < focusPoints.length - 1 ? prevIndex + 1 : prevIndex
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2 }}
      className="w-full max-w-4xl bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl overflow-hidden"
    >
      <div className="p-8">
        <div className="flex items-center gap-8 mb-8">
          <div className="flex-grow">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-4xl font-bold text-white mb-2"
            >
              {contactInfo.name}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-xl text-blue-300 mb-4"
            >
              {contactInfo.title}
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="space-y-2"
            >
              <a href={`mailto:${contactInfo.email}`} className="flex items-center gap-2 text-gray-300 hover:text-blue-300 transition-colors">
                <Mail size={18} />
                <span>{contactInfo.email}</span>
              </a>
              <a href={`tel:${contactInfo.phone}`} className="flex items-center gap-2 text-gray-300 hover:text-blue-300 transition-colors">
                <Phone size={18} />
                <span>{contactInfo.phone}</span>
              </a>
              <a href={`https://${contactInfo.linkedin}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-300 hover:text-blue-300 transition-colors">
                <Linkedin size={18} />
                <span>{contactInfo.linkedin}</span>
              </a>
              <a href={`https://${contactInfo.github}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-300 hover:text-blue-300 transition-colors">
                <Github size={18} />
                <span>{contactInfo.github}</span>
              </a>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="w-32 h-32 relative overflow-hidden shadow-xl flex-shrink-0"
          >
            <Image
              src="/placeholder.svg?height=128&width=128"
              alt="Profile photo"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="bg-white bg-opacity-5 rounded-lg p-6"
        >
          <h2 className="text-2xl font-semibold text-blue-300 mb-4">Focus</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {focusPoints.map((point, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.3 + index * 0.15, duration: 0.8 }}
                className="flex items-center gap-2"
              >
                <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                {index === currentFocusIndex ? (
                  <TypewriterText 
                    text={point} 
                    onComplete={handleFocusItemComplete} 
                  />
                ) : index < currentFocusIndex ? (
                  <span>{point}</span>
                ) : null}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </motion.div>
  )
}

