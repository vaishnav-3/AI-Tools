"use client";
import { Button } from "./button";
import { Input } from "./input";
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import {
  Brain,
  FileText,
  MessageSquare,
  Search,
  Zap,
  Lock,
  Users,
  Star,
  Menu,
  LayoutDashboard,
  Video,
  FastForward,
  BookOpenCheck,
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

function Hero() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex flex-col min-h-screen ">
      <header className="px-4 lg:px-6 h-14 flex lg:py-10 items-center border-b sticky top-0 bg-background bg-white z-50">
        <Link className="flex items-center justify-center" href="#">
          <Image alt="Logo here"src={'/logo.svg'} width={40} height={20}/>
          <span className="ml-2 text-xl font-bold">LearnX-AI</span>
        </Link>
        <div className="md:hidden ml-auto">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Open menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
        <nav
          className={`${mobileMenuOpen ? "flex" : "hidden"}  md:flex absolute md:relative top-14 left-0 right-0 bg-background md:top-0 flex-col md:items-center md:flex-row gap-12 md:ml-auto p-4 md:p-0 border-b md:border-none`}
        >
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#features"
          >
            Features
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#how-it-works"
          >
            How It Works
          </Link>
          
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#testimonials"
          >
            Testimonials
          </Link>
          <Link
            className="text-sm flex bg-blue-600 gap-3 p-2 text-white rounded-md font-medium"
            href="/dashboard"
          >
            <LayoutDashboard size={20} />
            Dashboard
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-10 lg:py-10 bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800">
          <div className="container max-w-[1400px] mx-auto px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter  sm:text-[48px] leading-[1.2] xl:text-[60px] bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-500">
                    Smart Learning Notes with Artificial Intelligence
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                    Transform your Learnings into interactive knowledge. Ask
                    questions, get instant answers, and unlock insights with
                    LearnX-AI.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link
                    href={"/dashboard"}
                    className="bg-blue-600  w-fit py-2 text-white hover:bg-blue-700 flex items-center px-2 rounded-lg"
                  >
                    Try LearnX-AI
                  </Link>
                  {/* <Button size="lg" variant="outline">
                    Watch Demo
                  </Button> */}
                </div>
              </div>
              <div className="flex items-center justify-center">
                <img src="/main.svg" alt="" />
                {/* <Card className="w-full ">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="w-5 h-5 text-blue-600" />
                      Ask Notely
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <FileText className="w-4 h-4 text-blue-600" />
                        <span className="text-sm">research_paper.pdf</span>
                      </div>
                      <div className="p-4 bg-muted rounded-lg">
                        <p className="text-sm">
                          What are the key findings of the study?
                        </p>
                      </div>
                      <div className="p-4 bg-blue-600/10 rounded-lg">
                        <p className="text-sm">
                          The study found three major impacts:
                          <br /> 1&#41; 45% improvement in learning retention{" "}
                          <br />
                          2&#41; 30% reduction in study time <br /> 3&#41; 92%
                          user satisfaction rate.
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Input
                          className="flex-grow"
                          placeholder="Ask about your PDF..."
                        />
                        <Button
                          size="icon"
                          className="bg-blue-600 text-white hover:bg-blue-700"
                        >
                          <MessageSquare className="h-4 w-4" />
                          <span className="sr-only">Send</span>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card> */}
              </div>
            </div>
          </div>
        </section>

        <section
          id="features"
          className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-900"
        >
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              Powerful Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <Brain className="w-8 h-8 mb-2 text-teal-500" />
                  <CardTitle>AI-Powered Notes</CardTitle>
                </CardHeader>
                <CardContent>
                  Our advanced AI processes your queries, extracting key
                  information and providing intelligent insights.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <MessageSquare className="w-8 h-8 mb-2 text-teal-500" />
                  <CardTitle>Natural Language Queries</CardTitle>
                </CardHeader>
                <CardContent>
                  Ask questions in plain English and get accurate answers from
                  your PDF content instantly.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Video className="w-8 h-8 mb-2 text-teal-500" />
                  <CardTitle>Video Lectures</CardTitle>
                </CardHeader>
                <CardContent>
                  Skip the fluff. Get clear answers and highlights from your video lectures—instantly.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Zap className="w-8 h-8 mb-2 text-teal-500" />
                  <CardTitle>Fast Processing</CardTitle>
                </CardHeader>
                <CardContent>
                  Experience lightning-fast PDF analysis and question-answering,
                  saving you valuable time.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <FastForward className="w-8 h-8 mb-2 text-teal-500" />
                  <CardTitle>FlashCards</CardTitle>
                </CardHeader>
                <CardContent>
                  Review key concepts faster with intelligently generated flashcards.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <BookOpenCheck className="w-8 h-8 mb-2 text-teal-500" />
                  <CardTitle>Quiz</CardTitle>
                </CardHeader>
                <CardContent>
                  Practice and master concepts with personalized quizzes based on your content.
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section
          id="how-it-works"
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800"
        >
          <div className="container px-4 md:px-6 mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              How LearnX-AI Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center mb-4 text-2xl font-bold">
                  1
                </div>
                <h3 className="text-xl font-bold mb-2">Upload Your Query</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Start by submitting your question or topic. Whether it's a concept, doubt, or subject area, LearnX-AI is ready to help.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center mb-4 text-2xl font-bold">
                  2
                </div>
                <h3 className="text-xl font-bold mb-2">AI Gets to Work</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Our AI analyzes your query, generates notes, finds relevant YouTube videos, and delivers key learning content instantly.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center mb-4 text-2xl font-bold">
                  3
                </div>
                <h3 className="text-xl font-bold mb-2">Get Instant Answers</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Receive accurate and helpful outputs—answers, summaries, flashcards, or quizzes—tailored to boost your understanding and retention.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          id="testimonials"
          className="w-full py-12 md:py-24 lg:py-32  dark:bg-gray-800 bg-white"
        >
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              What Our Users Say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <Star className="w-5 h-5 fill-blue-600 text-blue-600" />
                    <Star className="w-5 h-5 fill-blue-600 text-blue-600" />
                    <Star className="w-5 h-5 fill-blue-600 text-blue-600" />
                    <Star className="w-5 h-5 fill-blue-600 text-blue-600" />
                    <Star className="w-5 h-5 fill-blue-600 text-blue-600" />
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    "The AI-generated notes are a lifesaver during exam prep. I can finally focus on understanding instead of just summarizing."
                  </p>
                  <div className="font-semibold">Aanya Mehta</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Computer Science Student
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <Star className="w-5 h-5 fill-blue-600 text-blue-600" />
                    <Star className="w-5 h-5 fill-blue-600 text-blue-600" />
                    <Star className="w-5 h-5 fill-blue-600 text-blue-600" />
                    <Star className="w-5 h-5 fill-blue-600 text-blue-600" />
                    <Star className="w-5 h-5 fill-blue-600 text-blue-600" />
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    "I love how it finds relevant video lectures for my topics. It feels like the platform truly understands how can I learn best."
                  </p>
                  <div className="font-semibold">Rohan Patel</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Engineering Student
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <Star className="w-5 h-5 fill-blue-600 text-blue-600" />
                    <Star className="w-5 h-5 fill-blue-600 text-blue-600" />
                    <Star className="w-5 h-5 fill-blue-600 text-blue-600" />
                    <Star className="w-5 h-5 fill-blue-600 text-blue-600" />
                    <Star className="w-5 h-5 fill-blue-600 text-blue-600" />
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    "Our team's productivity has skyrocketed since we started
                    using LearnX-AI. It's an indispensable tool for our market
                    research and competitive analysis."
                  </p>
                  <div className="font-semibold">Sarah Thompson</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Marketing Director
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-blue-600 to-teal-500 text-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Ready to Transform Your Learning Experience?
                </h2>
                <p className="mx-auto max-w-[700px] text-white/80 md:text-xl">
                  Join thousands of professionals who are revolutionizing the
                  way they interact with Advance Learning using LearnX-AI.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input
                    className="flex-1 bg-white text-blue-600 placeholder:text-blue-600/50"
                    placeholder="Enter your email"
                    type="email"
                  />
                  <Button
                    type="submit"
                    className="bg-white text-blue-600 hover:bg-white/90"
                  >
                    Get Started
                  </Button>
                </form>
               
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-blue-200">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2025 LearnX-AI. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy Policy
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Cookie Policy
          </Link>
        </nav>
      </footer>
    </div>
  );
}


export default Hero