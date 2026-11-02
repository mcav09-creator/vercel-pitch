export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  linkedin?: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Matt is the example of the tech salesperson for today that I tell everyone about. He is knowledgeable and consultative. He feels like an extension of our team. While we know his goal is for us to buy from him, he is always working with us to help us achieve our goals. He opens doors for us and has enabled us to be successful even when it isn't directly tied to him selling. This has built a deep trust in our organisation.",
    name: "Aaron Driver",
    role: "Chief AI Officer, University of New England",
    linkedin: "https://www.linkedin.com/in/aaronbdriver/",
  },
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
