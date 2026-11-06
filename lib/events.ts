export type EventCategory =
  | "Technology"
  | "Music"
  | "Business"
  | "Sports"
  | "Art"
  | "Education";

export type EventItem = {
  id: string;
  name: string;
  category: EventCategory;
  date: string;
  time: string;
  venue: string;
  city: string;
  shortDescription: string;
  fullDescription: string;
  organizer: string;
  price: number;
  emoji: string;
  gradient: string;
  highlights: string[];
};

export const CATEGORIES: (EventCategory | "All")[] = [
  "All",
  "Technology",
  "Music",
  "Business",
  "Sports",
  "Art",
  "Education",
];

export const EVENTS: EventItem[] = [
  {
    id: "tech-summit-2026",
    name: "Tech Summit 2026",
    category: "Technology",
    date: "2026-03-14",
    time: "09:00 AM - 06:00 PM",
    venue: "Moscone Center",
    city: "San Francisco, CA",
    shortDescription:
      "The flagship gathering for engineers, founders and product leaders shaping the next decade of software.",
    fullDescription:
      "Tech Summit 2026 brings together the brightest minds in software, hardware and AI for a full day of keynotes, hands-on workshops and networking. Explore the future of cloud-native systems, on-device intelligence and developer experience with the people building it. Whether you are shipping your first app or scaling a global platform, you will leave with practical playbooks and a stronger network.",
    organizer: "Frontier Labs",
    price: 299,
    emoji: "💻",
    gradient: "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)",
    highlights: [
      "Keynote: 'The On-Device AI Era' by Dr. Maya Iyer, CTO of Frontier Labs",
      "12 hands-on workshops covering Rust, WebGPU and edge compute",
      "Live startup pitch-off with $100k in credits from cloud partners",
      "Expo floor with 40+ exhibitors and a dedicated demo alley",
      "After-hours networking reception at the rooftop garden lounge",
    ],
  },
  {
    id: "jazz-night-live",
    name: "Jazz Night Live",
    category: "Music",
    date: "2026-04-05",
    time: "07:30 PM - 11:00 PM",
    venue: "Blue Note Hall",
    city: "New Orleans, LA",
    shortDescription:
      "An intimate evening of contemporary and classic jazz from award-winning ensembles.",
    fullDescription:
      "Jazz Night Live returns to the legendary Blue Note Hall for one unforgettable evening. Three acclaimed ensembles take the stage, weaving standards and originals into a single continuous set. A curated cocktail and small-plates menu is available throughout the show. Seating is limited and every seat is within 40 feet of the stage, so you feel every note.",
    organizer: "Crescent Sound Collective",
    price: 75,
    emoji: "🎷",
    gradient: "linear-gradient(135deg, #f59e0b 0%, #ec4899 100%)",
    highlights: [
      "Three live sets from award-winning ensembles",
      "Special guest soloist: trumpeter Marcus Bell",
      "Curated cocktail & small-plates menu available all night",
      "Signed poster giveaway for the first 50 guests",
      "Meet-and-greet with the artists after the final set",
    ],
  },
  {
    id: "startup-bootcamp",
    name: "Startup Bootcamp",
    category: "Business",
    date: "2026-02-21",
    time: "10:00 AM - 04:00 PM",
    venue: "Innovation Hub",
    city: "Austin, TX",
    shortDescription:
      "A one-day intensive that takes you from idea to validated MVP with mentor feedback at every step.",
    fullDescription:
      "Startup Bootcamp is a one-day intensive designed for early-stage founders. Work through customer discovery, positioning, pricing and a lean pitch with operators who have shipped and scaled real companies. You will leave with a validated MVP plan, a draft pitch deck and a list of warm intros from our mentor network.",
    organizer: "Founders Forge",
    price: 149,
    emoji: "🚀",
    gradient: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
    highlights: [
      "Customer discovery sprint led by 3x exited founder Priya Nair",
      "Live pitch clinic with feedback from 5 active investors",
      "Templates for positioning, pricing and lean pitch decks",
      "Mentor 1:1 speed-networking sessions (book on the day)",
      "3 months of co-working access at Innovation Hub included",
    ],
  },
  {
    id: "marathon-2026",
    name: "Marathon 2026",
    category: "Sports",
    date: "2026-05-10",
    time: "06:00 AM - 01:00 PM",
    venue: "Lakeside Promenade",
    city: "Chicago, IL",
    shortDescription:
      "A certified 42.2 km course along the lakefront with chip timing, aid stations and a finisher medal.",
    fullDescription:
      "Marathon 2026 is a Boston-qualifying certified 42.2 km course that winds through the city and along the scenic lakefront. Chip timing, full and half-marathon distances, gear check, and refreshment stations every 3 km. All finishers receive a commemorative medal and a finish-line recovery zone with massage, snacks and live music.",
    organizer: "Lakeside Runners Club",
    price: 89,
    emoji: "🏃",
    gradient: "linear-gradient(135deg, #10b981 0%, #06b6d4 100%)",
    highlights: [
      "Boston-qualifying certified 42.2 km full marathon course",
      "Half-marathon and 10 km distances also available",
      "Aid stations every 3 km with electrolytes and nutrition",
      "Finisher medal and recovery zone with massage & live music",
      "Free race photos and a personalized finish-line video",
    ],
  },
  {
    id: "art-exhibition",
    name: "Art Exhibition: Visions in Color",
    category: "Art",
    date: "2026-06-18",
    time: "11:00 AM - 08:00 PM",
    venue: "Riverside Gallery",
    city: "Brooklyn, NY",
    shortDescription:
      "A juried showcase of 30 contemporary artists exploring color, light and movement.",
    fullDescription:
      "Visions in Color is a juried exhibition featuring 30 contemporary artists whose work explores color as a language of its own. The exhibition spans painting, digital art, sculpture and immersive light installations. A guided curator tour runs twice daily, and a limited-edition print series is available exclusively to attendees.",
    organizer: "Riverside Gallery Collective",
    price: 25,
    emoji: "🎨",
    gradient: "linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)",
    highlights: [
      "30 contemporary artists across painting, digital and sculpture",
      "Immersive light installation in the south wing",
      "Curator-led tours at 12:00 PM and 5:00 PM daily",
      "Limited-edition print series exclusive to attendees",
      "Opening-night reception with the artists on June 17",
    ],
  },
  {
    id: "ai-ml-workshop",
    name: "AI & ML Workshop",
    category: "Technology",
    date: "2026-03-28",
    time: "09:30 AM - 05:00 PM",
    venue: "Polytech Institute",
    city: "Seattle, WA",
    shortDescription:
      "A hands-on workshop building and shipping a real ML model, from data to deployment.",
    fullDescription:
      "The AI & ML Workshop is a full day of hands-on building. You will start with a real dataset, train and evaluate models, and deploy a working inference endpoint by the end of the day. The curriculum is designed for working developers who want to add ML to their toolkit, not for researchers. Bring a laptop; we provide the cloud credits.",
    organizer: "Applied ML Guild",
    price: 199,
    emoji: "🤖",
    gradient: "linear-gradient(135deg, #0ea5e9 0%, #6366f1 100%)",
    highlights: [
      "Build and deploy a real inference endpoint by end of day",
      "Cover data prep, training, evaluation and MLOps basics",
      "Free $200 in cloud credits to continue experimenting after",
      "Designed for working developers, not researchers",
      "Certificate of completion and a take-home project repo",
    ],
  },
  {
    id: "growth-marketing-summit",
    name: "Growth Marketing Summit",
    category: "Business",
    date: "2026-04-22",
    time: "09:00 AM - 05:30 PM",
    venue: "Harbor Convention Center",
    city: "Miami, FL",
    shortDescription:
      "Practical playbooks for acquisition, retention and brand from marketers scaling today's fastest companies.",
    fullDescription:
      "The Growth Marketing Summit brings together marketing leaders from the fastest-growing companies to share what is actually working in acquisition, retention and brand. Expect data-backed case studies, live teardowns and a hands-on analytics track. No fluff, no recycled deck, just playbooks you can run next week.",
    organizer: "Momentum Media",
    price: 179,
    emoji: "📈",
    gradient: "linear-gradient(135deg, #f97316 0%, #ef4444 100%)",
    highlights: [
      "Data-backed case studies from 8 high-growth companies",
      "Live marketing teardowns with the audience's real numbers",
      "Hands-on analytics track: attribution, cohorts and LTV",
      "Brand-and-performance panel with CMOs from 3 unicorns",
      "Take-home playbook pack (templates, prompts, dashboards)",
    ],
  },
  {
    id: "championship-finals",
    name: "City Championship Finals",
    category: "Sports",
    date: "2026-07-04",
    time: "04:00 PM - 10:00 PM",
    venue: "Central Stadium",
    city: "Los Angeles, CA",
    shortDescription:
      "The title-deciding finale of the city league with food trucks, fan zones and fireworks at halftime.",
    fullDescription:
      "City Championship Finals is the title-deciding finale of the city league, played under lights at Central Stadium. The evening includes a fan zone with food trucks, a skills challenge for kids, and a fireworks show at halftime. Family-friendly tickets and VIP seating are available. Gates open at 4:00 PM and kickoff is at 7:00 PM sharp.",
    organizer: "City Sports Authority",
    price: 45,
    emoji: "🏆",
    gradient: "linear-gradient(135deg, #eab308 0%, #f97316 100%)",
    highlights: [
      "Title-deciding finale under lights at Central Stadium",
      "Fan zone with food trucks and a kids skills challenge",
      "Halftime fireworks show",
      "Family-friendly and VIP seating options available",
      "Gates open at 4:00 PM, kickoff at 7:00 PM sharp",
    ],
  },
  {
    id: "design-education-conf",
    name: "Design in Education Conf",
    category: "Education",
    date: "2026-05-30",
    time: "08:30 AM - 04:00 PM",
    venue: "University Hall",
    city: "Boston, MA",
    shortDescription:
      "Educators and designers sharing how design thinking is reshaping classrooms and curricula.",
    fullDescription:
      "Design in Education Conf brings together K-12 and higher-ed educators with practicing designers to share how design thinking is reshaping classrooms, curricula and student outcomes. The day mixes talks, hands-on workshops and a student showcase. CEU credit is available for participating educators.",
    organizer: "Learning by Design",
    price: 99,
    emoji: "📚",
    gradient: "linear-gradient(135deg, #14b8a6 0%, #3b82f6 100%)",
    highlights: [
      "Talks and hands-on workshops for K-12 and higher-ed",
      "Student showcase of classroom design-thinking projects",
      "Continuing Education Units (CEU) credit available",
      "Curriculum design toolkit for educators to take home",
      "Networking lunch with educators from 12 districts",
    ],
  },
  {
    id: "classical-strings-recital",
    name: "Classical Strings Recital",
    category: "Music",
    date: "2026-06-07",
    time: "06:00 PM - 08:30 PM",
    venue: "Symphony Hall",
    city: "Boston, MA",
    shortDescription:
      "A chamber recital of strings and piano featuring works by Dvořák, Schubert and a world premiere.",
    fullDescription:
      "Classical Strings Recital is an evening of chamber music at Symphony Hall, featuring Dvořák's American Quartet, Schubert's Trout Quintet, and the world premiere of a new commission by composer Lina Okonkwo. The program runs without an intermission and is followed by a brief Q&A with the performers in the main lobby.",
    organizer: "New England Chamber Society",
    price: 60,
    emoji: "🎻",
    gradient: "linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)",
    highlights: [
      "Dvořák's American Quartet and Schubert's Trout Quintet",
      "World premiere of a new commission by Lina Okonkwo",
      "No intermission, program runs ~2.5 hours",
      "Post-show Q&A with the performers in the main lobby",
      "Program booklet and digital recording link included",
    ],
  },
  {
    id: "python-for-educators",
    name: "Python for Educators",
    category: "Education",
    date: "2026-04-12",
    time: "09:00 AM - 03:00 PM",
    venue: "Tech Learning Center",
    city: "Denver, CO",
    shortDescription:
      "A beginner-friendly Python workshop for teachers who want to bring coding into the classroom.",
    fullDescription:
      "Python for Educators is a beginner-friendly workshop for teachers who want to bring coding into the classroom. No prior coding experience is required. You will write your first programs, learn how to teach them, and leave with a semester of lesson plans and project ideas aligned to middle and high school standards.",
    organizer: "Code for Classrooms",
    price: 39,
    emoji: "🐍",
    gradient: "linear-gradient(135deg, #22c55e 0%, #14b8a6 100%)",
    highlights: [
      "Beginner-friendly, no prior coding experience required",
      "Write your first programs and learn how to teach them",
      "A full semester of ready-to-use lesson plans included",
      "Project ideas aligned to middle & high school standards",
      "Free 1-year classroom license for our coding platform",
    ],
  },
];
