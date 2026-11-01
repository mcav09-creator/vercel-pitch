export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  linkedin?: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Matt opens doors most sellers can't, especially in education. He got us in front of the president of the largest university in the US, and he builds his own prototypes to prove value instead of waiting on anyone else. He's a true enterprise seller who brings an energy and enthusiasm to his work that made him a joy to have on the team.",
    name: "Brad Perriott",
    role: "Former manager, monō ai",
    linkedin: "https://www.linkedin.com/in/bradperriott/",
  },
  {
    quote:
      "Matt is the person the rest of us went to when we needed to understand a new product. He learns faster than anyone I've worked with, and he builds markets other reps wouldn't touch.",
    name: "Mike O'Brien",
    role: "Peer, Salesforce",
    linkedin: "https://www.linkedin.com/in/miobrien2/",
  },
  {
    quote:
      "Matt didn't sell us software, he helped us rethink how 17 schools could run as one. He built the roadmap with us, stayed with it long after the contract was signed, and he's still someone I call.",
    name: "Jeremy Kwok",
    role: "Co-CEO, Christian Education Ministries",
  },
];
