import { Telescope, Users, Heart } from "lucide-react";
import { LogoIcon } from "@/components/shared/logo-icon";

const values = [
  {
    icon: Telescope,
    title: "Precision",
    description:
      "We use accurate astronomical data and time-tested astrological frameworks to generate your charts and readings.",
  },
  {
    icon: Users,
    title: "Accessibility",
    description:
      "Astrology should be for everyone. We break down complex cosmic patterns into clear, actionable insights.",
  },
  {
    icon: Heart,
    title: "Empowerment",
    description:
      "Our goal is not to predict your fate, but to help you understand yourself and make more conscious choices.",
  },
];

const team = [
  {
    name: "Elena Vasquez",
    role: "Founder & Lead Astrologer",
    initials: "EV",
    bio: "Certified astrologer with 15+ years of experience. Elena founded AstroPath to bridge ancient astrological wisdom with modern technology.",
  },
  {
    name: "David Kim",
    role: "Head of Engineering",
    initials: "DK",
    bio: "Full-stack engineer passionate about building tools that make complex data beautiful and accessible to everyone.",
  },
  {
    name: "Priya Sharma",
    role: "Content Director",
    initials: "PS",
    bio: "Astrology writer and educator who brings depth and clarity to every horoscope, article, and natal report on the platform.",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-[#FAFAF5]">
      {/* Hero section */}
      <section className="relative overflow-hidden py-24 sm:py-32">
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-1.5 text-sm text-[#FF6600]">
            <LogoIcon className="size-5" />
            Our Story
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Mapping the Cosmos,{" "}
            <span className="bg-gradient-to-r from-[#FF6600] to-[#FF8C00] bg-clip-text text-transparent">
              One Chart at a Time
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-600">
            AstroPath was born from a simple belief: that the ancient wisdom
            of astrology, combined with modern technology, can help people
            navigate life with greater self-awareness and intention.
          </p>
        </div>
      </section>

      {/* Story section */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">How It All Began</h2>
              <div className="mt-6 space-y-4 text-gray-600 leading-relaxed">
                <p>
                  In 2022, our founder Elena Vasquez noticed a gap in the
                  astrology space. Most platforms offered generic, one-size-fits-all
                  horoscopes that barely scratched the surface of what astrology
                  could offer.
                </p>
                <p>
                  She envisioned a platform that would combine the depth of
                  professional natal chart interpretation with the accessibility of
                  a modern web application. A place where beginners could learn
                  about their Sun sign, and experienced practitioners could dive
                  deep into transits and progressions.
                </p>
                <p>
                  Today, AstroPath serves tens of thousands of users who rely
                  on our platform for daily guidance, self-discovery, and a deeper
                  understanding of their cosmic blueprint.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-2xl border border-orange-200 bg-orange-50 p-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-[#FF6600]">50K+</p>
                    <p className="mt-1 text-sm text-gray-600">Charts Generated</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-[#FF6600]">12</p>
                    <p className="mt-1 text-sm text-gray-600">Zodiac Signs Covered</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-[#FF6600]">365</p>
                    <p className="mt-1 text-sm text-gray-600">Daily Readings / Year</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-[#FF6600]">10</p>
                    <p className="mt-1 text-sm text-gray-600">Planetary Bodies Tracked</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission section */}
      <section className="relative py-16 sm:py-24">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#FF6600]/30 to-transparent" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
            <p className="mt-6 text-xl leading-relaxed text-gray-600">
              To make astrology accessible, accurate, and meaningful for everyone
              -- from curious newcomers to seasoned practitioners -- by combining
              ancient celestial wisdom with cutting-edge technology.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {values.map((value) => (
              <div
                key={value.title}
                className="rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm"
              >
                <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-xl bg-orange-50 text-[#FF6600]">
                  <value.icon className="size-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team section */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#FF6600]">
              The Team
            </p>
            <h2 className="mt-3 text-3xl font-bold text-gray-900">
              The People Behind the Stars
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              A passionate team of astrologers, engineers, and storytellers.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {team.map((member) => (
              <div
                key={member.name}
                className="rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm"
              >
                <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-gradient-to-br from-[#FF6600] to-[#FF8C00] text-lg font-bold text-white">
                  {member.initials}
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {member.name}
                </h3>
                <p className="text-sm font-medium text-[#FF6600]">
                  {member.role}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
