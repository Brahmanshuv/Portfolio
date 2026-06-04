export const content = {
    hero: {
        title: "Dream Holidays",
        subtitle: "Bringing a 25-year travel agency online without losing what made it trusted.",
        coverImage: "hero-cover.webp"
    },
    sections: {
        overview: {
            title: "Overview",
            heading: "The Project",
            keyTakeaway: "Dream Holidays had 25 years of trust built offline. The challenge was bringing that online without losing it.",
            paragraphs: [
                "Dream Holidays is a travel agency that has been running for over 25 years. They built their reputation on personal relationships — understanding what a family actually wants from a holiday and building something tailored, not off-the-shelf.",
                "The problem was simple: they had no website. Every inquiry came through a phone call or WhatsApp message. Agents spent most of their day answering the same basic questions instead of doing the planning work they were good at.",
                "The goal was to give them a digital presence where customers could explore and get informed before reaching out — without replacing the human element that made the agency worth calling in the first place."
            ]
        },
        problem: {
            title: "The Problem",
            heading: "Why People Had to Call",
            keyTakeaway: "Every conversation started from zero. Customers had no context. Agents had no time.",
            paragraphs: [
                "Without a website, customers had no way to understand what the agency offered before picking up the phone. The first call was always the same:"
            ],
            bullets: [
                "What destinations do you cover?",
                "What's roughly included in a package?",
                "How does pricing work?",
                "Can you send me an itinerary?"
            ],
            paragraphsAfter: [
                "Agents answered these questions dozens of times a week. WhatsApp became the default channel — packages shared as images, itineraries sent as PDFs, questions scattered across multiple threads. It worked at small scale, but it didn't hold up as volume grew.",
                "The bigger cost was invisible. Customers who might have converted had nowhere to explore before committing to a call. People who weren't ready to book had no way to stay engaged."
            ]
        },
        existingJourney: {
            title: "Existing Journey",
            heading: "How It Worked",
            subtitle: "Customer flow before the website",
            image: "journey-diagram.webp",
            steps: [
                "Customer wants a trip",
                "Calls the agency",
                "Agent shares options",
                "Customer asks questions",
                "Agent sends itinerary",
                "Back-and-forth",
                "Booking discussion"
            ]
        },
        approach: {
            title: "Approach",
            heading: "What We Decided Not to Build",
            keyTakeaway: "The goal was not to replace travel advisors. It was to help customers arrive at the conversation better informed.",
            paragraphs: [
                "The obvious answer would have been a booking platform — search, filter, checkout. But that's not how this agency works. Their value is curation and guided planning. A self-serve checkout would have stripped that out completely.",
                "Instead, the decision was to build something closer to an editorial travel companion. A place where customers could:"
            ],
            bullets: [
                "Browse destinations and understand what each place actually involves",
                "See what a package looks like before asking about price",
                "Read day-by-day itineraries and eliminate their own basic questions",
                "Submit a meaningful inquiry instead of a cold first call"
            ],
            paragraphsAfter: [
                "The human advisor stays in the loop — they just get contacted at the right moment, not the first one. This meant designing for exploration rather than conversion."
            ]
        },
        solution: {
            title: "Solution",
            heading: "What Was Built",
            keyTakeaway: "Four areas of design — each targeting a specific point in the journey where customers previously had to call.",
            subsections: [
                {
                    id: "destination-discovery",
                    title: "Destination Discovery",
                    description: "Destination pages led with photography and atmosphere — the kind of thing that makes someone stop scrolling. Climate, best time to visit, what the experience actually feels like. Enough context for someone to decide whether this place is right for them before making contact.",
                    image: "hero-cover.webp"
                },
                {
                    id: "package-exploration",
                    title: "Package Exploration",
                    description: "Packages were grouped by trip type, not just price. A family looking for beaches and a couple looking for culture need to see different options. Filters reflected intent — what kind of trip are you after — rather than just logistics.",
                    image: "package-discovery.webp"
                },
                {
                    id: "itinerary-pages",
                    title: "Itinerary Pages",
                    description: "Day-by-day breakdowns with clear structure: what's included, what's not, what to pack, what to expect at each stage. The detail that eliminates the most common pre-booking questions without requiring a call.",
                    image: "information-hierarchy.webp"
                },
                {
                    id: "inquiry-flow",
                    title: "Inquiry Flow",
                    description: "Rather than a generic contact form, the inquiry flow asked real questions: how many people, what kind of experience, any specific requirements. By the time an agent received a lead, they already had enough context to start a useful conversation.",
                    image: "final-ui.webp"
                }
            ]
        },
        outcome: {
            title: "Outcome",
            heading: "What Changed",
            keyTakeaway: "The shift wasn't just operational. It changed the quality of every customer conversation.",
            items: [
                "Customers can explore destinations and packages before reaching out — the agency's most common questions are now answered on the site.",
                "Agents receive inquiries with context. Instead of starting from scratch, they can move directly to planning.",
                "The inquiry form filters out vague leads. People who submit it have already thought about what they want.",
                "The agency has a presence they can point to. Word-of-mouth referrals now have somewhere useful to land."
            ]
        },
        reflection: {
            title: "Reflection",
            heading: "What I Took Away",
            keyTakeaway: "The hardest design problems here weren't visual. They were about figuring out what the product actually needed to do.",
            paragraphs: [
                "A lot of early conversations were about features — booking engines, comparison tools, live availability. Working through why those weren't right for this specific agency taught me more about product thinking than any framework.",
                "There's also something worth noting about designing for trust. Every decision had to feel considered, not templated. The content, the structure, the pacing — all of it needed to reflect an agency that genuinely knows what it's doing. That's harder to design for than a conversion funnel."
            ]
        }
    }
};
