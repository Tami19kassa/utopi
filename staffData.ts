export interface Staff {
  id: string;
  name: string;
  role: string;
  bio: string;
  history: string;
  image?: string;
}

export interface Department {
  id: string;
  name: string;
  lead: Staff;
  staff: Staff[];
}

export const HIERARCHY_DATA = {
  ceo: {
    id: "ceo-1",
    name: "Tamiru Kassahun",
    role: "Founder & CEO",
    bio: "Visionary architect of Ethiopia's digital future.",
    history: "Tamiru began his career in 2010 as a freelance media producer in Addis Ababa. Over the next decade, he founded three successful tech startups before establishing YouTobia in 2022 to unify the creative industry."
  },
  stakeholders: [
    {
      id: "sh-1",
      name: "Strategic Partner A",
      role: "Board Member / Stakeholder",
      bio: "Advisory lead for international expansion.",
      history: "Former executive at a pan-African telecommunications firm with 20 years of experience in cross-border scaling and digital infrastructure."
    }
  ],
  departments: [
    {
      id: "tech",
      name: "Technology",
      lead: { id: "l1", name: "Dawit Alemu", role: "CTO", bio: "Tech visionary.", history: "Dawit was previously the head of engineering at a major local bank. He joined YouTobia to build the proprietary streaming engine from scratch." },
      staff: [
        { id: "t1", name: "Mekdes Girma", role: "Senior Developer", bio: "", history: "Mekdes is a full-stack specialist with 6 years experience in Python and React. She previously worked on national census software." },
        { id: "t2", name: "Berhane Wolde", role: "UX/UI Designer", bio: "", history: "An award-winning designer who focuses on accessibility. She has designed over 50 mobile apps for the East African market." }
      ]
    },
    {
      id: "admin",
      name: "Admin",
      lead: { id: "l2", name: "Natnael Bekele", role: "Head of Administration", bio: "Operations architect.", history: "Natnael has a background in public administration. He ensures the company's internal engines run as smoothly as the external ones." },
      staff: [{ id: "a1", name: "Sara Tadesse", role: "HR Manager", bio: "", history: "Sara handles talent acquisition. She previously worked in the NGO sector for 8 years." }]
    },
    {
      id: "marketing",
      name: "Marketing",
      lead: { id: "l3", name: "Helina Tesfaye", role: "Marketing Director", bio: "Brand genius.", history: "Helina led national campaigns for Ethiopia's largest beverage brands before moving into the digital media space." },
      staff: Array(8).fill(null).map((_, i) => ({
        id: `m-${i}`,
        name: `Marketing Pro ${i + 1}`,
        role: "Specialist",
        bio: "",
        history: "A key member of the growth team, specializing in social media engagement and local brand partnerships."
      }))
    },
    {
      id: "content",
      name: "Content",
      lead: { id: "l4", name: "Yonas Bekele", role: "Head of Content", bio: "Master storyteller.", history: "Yonas is a former documentary filmmaker whose work has been featured in international film festivals." },
      staff: [{ id: "c1", name: "Abel Tadesse", role: "Lead Editor", bio: "", history: "With 12 years in the edit suite, Abel is the final touch on all eTop productions." }]
    },
    {
      id: "quiz",
      name: "Quiz",
      lead: { id: "l5", name: "Biruk Assefa", role: "Gamification Lead", bio: "Behavioral strategist.", history: "Biruk spent 5 years in Europe studying game mechanics before returning to Addis to build the EnqoqCash platform." },
      staff: [{ id: "q1", name: "Abreham Girma", role: "Logic Engineer", bio: "", history: "Abreham maintains the real-time scoring backend for the quiz platform." }]
    },
    {
      id: "ops",
      name: "Operation",
      lead: { id: "l6", name: "Feven Hailu", role: "Operations Lead", bio: "Logistics expert.", history: "Feven manages the day-to-day coordination between the creative and technical teams." },
      staff: [{ id: "o1", name: "Lidiya Solomon", role: "Project Manager", bio: "", history: "Lidiya ensures all department timelines are met with military precision." }]
    }
  ]
};