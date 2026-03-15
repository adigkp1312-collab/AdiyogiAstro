"use client";

import * as React from "react";
import {
  Mail,
  MailOpen,
  Clock,
  Check,
  ChevronDown,
  ChevronUp,
  Inbox,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Message {
  id: string;
  senderName: string;
  senderEmail: string;
  subject: string;
  content: string;
  date: string;
  read: boolean;
}

const placeholderMessages: Message[] = [
  {
    id: "1",
    senderName: "Jessica Moore",
    senderEmail: "jessica.moore@email.com",
    subject: "Question about birth chart accuracy",
    content:
      "Hi there! I recently generated my birth chart on your platform and noticed that my rising sign shows as Scorpio, but another website says it should be Sagittarius. I used the same birth time (2:35 PM) and location (Denver, CO). Could you help me understand why there might be a difference? I want to make sure I have the most accurate chart possible. Thank you for your help!",
    date: "2026-03-12T14:30:00",
    read: false,
  },
  {
    id: "2",
    senderName: "Michael Torres",
    senderEmail: "m.torres@email.com",
    subject: "Premium subscription billing question",
    content:
      "Hello, I upgraded to Premium last month but I noticed I was charged twice for the subscription. The charges were on March 1st and March 3rd. Could you please look into this and refund the duplicate charge? My account email is m.torres@email.com. Thanks!",
    date: "2026-03-12T10:15:00",
    read: false,
  },
  {
    id: "3",
    senderName: "Sarah Williams",
    senderEmail: "sarah.w@email.com",
    subject: "Feature request: synastry charts",
    content:
      "I love your platform! I was wondering if you have any plans to add synastry chart comparisons? It would be amazing to be able to compare my chart with my partner's chart to see our compatibility aspects. This would be a great addition to the compatibility section. Keep up the great work!",
    date: "2026-03-11T18:45:00",
    read: false,
  },
  {
    id: "4",
    senderName: "David Park",
    senderEmail: "david.park@email.com",
    subject: "Feedback on daily horoscopes",
    content:
      "Just wanted to let you know that I really enjoy the daily horoscope readings. They have been surprisingly accurate and insightful. The premium content especially adds a lot of value with the timing suggestions and lucky numbers. Great job to the writing team!",
    date: "2026-03-11T09:20:00",
    read: true,
  },
  {
    id: "5",
    senderName: "Rachel Green",
    senderEmail: "rachel.green@email.com",
    subject: "Cannot access premium content",
    content:
      "Hi, I purchased the Premium plan yesterday but I still cannot access the premium horoscope content. When I try to view it, I get a message saying I need to upgrade. I already have a confirmation email for my purchase. Can you help me resolve this issue?",
    date: "2026-03-10T22:10:00",
    read: true,
  },
  {
    id: "6",
    senderName: "Tom Anderson",
    senderEmail: "tom.anderson@email.com",
    subject: "Partnership inquiry - Astrology podcast",
    content:
      "Hello! I run an astrology podcast called Stellar Conversations with about 15K monthly listeners. I would love to explore a partnership opportunity with AstroPath. We could feature your platform in our episodes and potentially collaborate on content. Would you be interested in discussing this further?",
    date: "2026-03-10T15:30:00",
    read: true,
  },
  {
    id: "7",
    senderName: "Emily Chen",
    senderEmail: "emily.chen@email.com",
    subject: "Bug report: Transit tracking page",
    content:
      "I found a bug on the transit tracking page. When I switch between different time zones, the planetary positions do not update correctly. The page seems to keep showing the positions for UTC regardless of what time zone I select. I am using Chrome on Windows 11. Hope this helps with debugging!",
    date: "2026-03-09T11:45:00",
    read: true,
  },
];

export default function AdminMessagesPage() {
  const [messages, setMessages] = React.useState(placeholderMessages);
  const [expandedId, setExpandedId] = React.useState<string | null>(null);

  function toggleExpand(id: string) {
    setExpandedId(expandedId === id ? null : id);
  }

  function markAsRead(id: string) {
    setMessages((prev) =>
      prev.map((msg) => (msg.id === id ? { ...msg, read: true } : msg))
    );
  }

  const unreadCount = messages.filter((m) => !m.read).length;

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-100">Messages</h2>
          <p className="text-sm text-slate-400">
            Contact form submissions and user inquiries
          </p>
        </div>
        <Badge className="bg-rose-500/10 text-rose-400">
          <Inbox className="mr-1 size-3" />
          {unreadCount} unread
        </Badge>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card className="border-white/10 bg-slate-900/50">
          <CardContent className="pt-0">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-blue-500/10">
                <Mail className="size-5 text-blue-400" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-slate-400">Total Messages</span>
                <span className="text-xl font-bold text-slate-100">
                  {messages.length}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-white/10 bg-slate-900/50">
          <CardContent className="pt-0">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-rose-500/10">
                <Mail className="size-5 text-rose-400" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-slate-400">Unread</span>
                <span className="text-xl font-bold text-rose-400">
                  {unreadCount}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-white/10 bg-slate-900/50">
          <CardContent className="pt-0">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-emerald-500/10">
                <MailOpen className="size-5 text-emerald-400" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-slate-400">Read</span>
                <span className="text-xl font-bold text-emerald-400">
                  {messages.length - unreadCount}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Message List */}
      <div className="flex flex-col gap-3">
        {messages.map((message) => {
          const isExpanded = expandedId === message.id;

          return (
            <Card
              key={message.id}
              className={`border-white/10 transition-colors ${
                !message.read
                  ? "border-l-2 border-l-amber-400 bg-slate-900/70"
                  : "bg-slate-900/50"
              }`}
            >
              <CardContent className="p-0">
                {/* Message Header */}
                <button
                  onClick={() => toggleExpand(message.id)}
                  className="flex w-full items-center gap-4 p-4 text-left transition-colors hover:bg-white/5"
                >
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-slate-800">
                    {message.read ? (
                      <MailOpen className="size-4 text-slate-500" />
                    ) : (
                      <Mail className="size-4 text-amber-400" />
                    )}
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-sm font-medium ${
                          !message.read ? "text-slate-100" : "text-slate-300"
                        }`}
                      >
                        {message.senderName}
                      </span>
                      <span className="text-xs text-slate-600">
                        {message.senderEmail}
                      </span>
                      {!message.read && (
                        <Badge className="bg-amber-500/10 text-amber-400">
                          New
                        </Badge>
                      )}
                    </div>
                    <span
                      className={`truncate text-sm ${
                        !message.read ? "font-medium text-slate-200" : "text-slate-400"
                      }`}
                    >
                      {message.subject}
                    </span>
                  </div>
                  <div className="flex shrink-0 items-center gap-3">
                    <div className="flex items-center gap-1 text-xs text-slate-500">
                      <Clock className="size-3" />
                      {new Date(message.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                      {", "}
                      {new Date(message.date).toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="size-4 text-slate-500" />
                    ) : (
                      <ChevronDown className="size-4 text-slate-500" />
                    )}
                  </div>
                </button>

                {/* Expanded Content */}
                {isExpanded && (
                  <div className="border-t border-white/5 px-4 py-4">
                    <div className="mb-4 rounded-lg bg-slate-800/50 p-4">
                      <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-300">
                        {message.content}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {!message.read && (
                        <Button
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            markAsRead(message.id);
                          }}
                          className="bg-gradient-to-r from-amber-500 to-amber-600 text-xs font-semibold text-slate-950 hover:from-amber-400 hover:to-amber-500"
                        >
                          <Check className="size-3" />
                          Mark as Read
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-white/10 text-xs text-slate-300 hover:bg-white/5 hover:text-white"
                      >
                        Reply
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
