from .database import SessionLocal
from .models import Society, Event


# ========================================
# SOCIETIES
# ========================================

societies = [

    {
        "name": "Thapar Nautanki Club",
        "category": "Cultural / Visual Arts",
        "description": "A creative community focused on performance and dramatic expression.",
        "about": "A platform for students interested in performance, creativity and dramatic expression.",
        "contact_email": None
    },

    {
        "name": "TU Toastmasters Club",
        "category": "Debate / Literary",
        "description": "A platform for improving public speaking, communication and leadership skills.",
        "about": "Helps students develop public speaking, communication and leadership skills.",
        "contact_email": "toastmasters_sc@thapar.edu"
    },

    {
        "name": "Microsoft Learn Student Chapter (MLSC)",
        "category": "Technical / Academic",
        "description": "A technical community focused on coding, technology, projects and hands-on learning.",
        "about": "A technical community encouraging coding, logical reasoning, technology learning, projects, meetups and hackathons.",
        "contact_email": "msc@thapar.edu"
    },

    {
        "name": "Google Developers Group (GDC)",
        "category": "Technical / Academic",
        "description": "A developer community focused on technology, hands-on learning and collaborative projects.",
        "about": "A student developer community focused on practical technology learning and collaborative development.",
        "contact_email": None
    },

    {
        "name": "ACM Computing Chapter",
        "category": "Technical / Academic",
        "description": "A computing chapter promoting technical learning and professional development.",
        "about": "Provides students opportunities to develop computing knowledge through technical activities, workshops and seminars.",
        "contact_email": None
    },

    {
        "name": "OWASP Student Chapter",
        "category": "Technical / Academic",
        "description": "A cybersecurity-focused chapter promoting network and application security.",
        "about": "Focuses on cybersecurity through workshops, guest lectures, competitions and technical activities.",
        "contact_email": "owasp_sc@thapar.edu"
    },

    {
        "name": "Fine Arts and Photography Society (FAPS)",
        "category": "Cultural / Visual Arts",
        "description": "A creative society focused on visual art, photography and artistic expression.",
        "about": "Provides a platform for sketching, painting, photography, calligraphy and digital art.",
        "contact_email": "faps@thapar.edu"
    },

    {
        "name": "Music and Dramatic Society (MUDRA)",
        "category": "Cultural / Visual Arts",
        "description": "A cultural society focused on music, dramatics and creative development.",
        "about": "Focuses on music and dramatics while encouraging creative and managerial development.",
        "contact_email": "mudra@thapar.edu"
    },

    {
        "name": "Literary Society",
        "category": "Debate / Literary",
        "description": "A literary society focused on language, literature, communication and expression.",
        "about": "Encourages students to develop language skills and appreciation for literary expression.",
        "contact_email": "litsoc@thapar.edu"
    },

    {
        "name": "Thapar Model United Nations (TUMUN)",
        "category": "Debate / Literary",
        "description": "A platform for debate, negotiation, diplomacy, research and public speaking.",
        "about": "Develops research, debating, negotiation, critical-thinking, teamwork and leadership skills.",
        "contact_email": "tumun@thapar.edu"
    },

    {
        "name": "Creative Computing Society (CCS)",
        "category": "Technical / Academic",
        "description": "A technical society focused on technology, innovation, workshops and coding competitions.",
        "about": "Encourages students to develop an analytical approach to technology and innovation.",
        "contact_email": "ccs@thapar.edu"
    },

    {
        "name": "ROTARACT CLUB - TIET",
        "category": "Social",
        "description": "A student organization focused on community service and social impact.",
        "about": "Brings students together for community-oriented initiatives and service activities.",
        "contact_email": "rotaractclub_sc@thapar.edu"
    },

    {
        "name": "Thapar Venture Club (TVC)",
        "category": "Entrepreneurship",
        "description": "A student organization focused on developing entrepreneurial thinking and initiative.",
        "about": "Aims to develop the spirit of entrepreneurship among students.",
        "contact_email": "edc@thapar.edu"
    }
]


# ========================================
# EVENTS
# ========================================

events = [

    {
        "title": "CCS Coding Workshop",
        "description": "A hands-on technical workshop for students interested in programming and problem solving.",
        "date": "20 Sep 2026",
        "time": "5:00 PM",
        "venue": "LT-101",
        "society": "Creative Computing Society (CCS)"
    },

    {
        "title": "MLSC Tech Meetup",
        "description": "An interactive technology session focused on modern development and practical learning.",
        "date": "24 Sep 2026",
        "time": "6:00 PM",
        "venue": "Conference Hall",
        "society": "Microsoft Learn Student Chapter (MLSC)"
    },

    {
        "title": "MUDRA Open Mic",
        "description": "An evening celebrating music, performance and creative expression.",
        "date": "27 Sep 2026",
        "time": "7:00 PM",
        "venue": "Auditorium",
        "society": "Music and Dramatic Society (MUDRA)"
    },

    {
        "title": "TUMUN Debate Session",
        "description": "A debate and public-speaking session focused on argumentation and diplomatic thinking.",
        "date": "02 Oct 2026",
        "time": "4:00 PM",
        "venue": "LT-201",
        "society": "Thapar Model United Nations (TUMUN)"
    },

    {
        "title": "FAPS Creative Workshop",
        "description": "A creative workshop exploring visual art and photography.",
        "date": "06 Oct 2026",
        "time": "5:30 PM",
        "venue": "Fine Arts Studio",
        "society": "Fine Arts and Photography Society (FAPS)"
    },

    {
        "title": "GDC Developer Session",
        "description": "A hands-on developer session focused on building and learning through technology.",
        "date": "10 Oct 2026",
        "time": "4:30 PM",
        "venue": "Computer Lab",
        "society": "Google Developers Group (GDC)"
    }
]


# ========================================
# DATABASE
# ========================================

db = SessionLocal()

try:

    society_objects = {}


    # ====================================
    # ADD SOCIETIES
    # ====================================

    for society_data in societies:

        existing = (
            db.query(Society)
            .filter(
                Society.name ==
                society_data["name"]
            )
            .first()
        )

        if existing:

            society_objects[
                existing.name
            ] = existing

            print(
                f"Already exists: {existing.name}"
            )

            continue


        society = Society(
            **society_data
        )

        db.add(society)

        db.flush()

        society_objects[
            society.name
        ] = society

        print(
            f"Added society: {society.name}"
        )


    # ====================================
    # ADD EVENTS
    # ====================================

    for event_data in events:

        society = society_objects.get(
            event_data["society"]
        )

        if society is None:

            print(
                f"Society not found: "
                f"{event_data['society']}"
            )

            continue


        existing = (
            db.query(Event)
            .filter(
                Event.title ==
                event_data["title"]
            )
            .first()
        )

        if existing:

            print(
                f"Already exists: "
                f"{event_data['title']}"
            )

            continue


        event = Event(

            title=event_data["title"],

            description=
                event_data["description"],

            date=event_data["date"],

            time=event_data["time"],

            venue=event_data["venue"],

            society_id=society.id,

            registration_required=True
        )

        db.add(event)

        print(
            f"Added event: {event.title}"
        )


    db.commit()

    print("")
    print("==============================")
    print("DATABASE SEEDED SUCCESSFULLY!")
    print("==============================")


finally:

    db.close()
    