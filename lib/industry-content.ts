export type IndustryContent = {
  statement: string;
  detailA: string;
  detailB: string;
  challengeTitle: string;
  challengePoints: string[];
  challengeNote: string;
  ecosystemHeadline: [string, string];
  ecosystemBody: string;
  applicationsLead: string;
  applications: { title: string; body: string }[];
  closing: [string, string];
};

/*
 * Vertical mobility copy is taken verbatim from the Figma masters.
 * The other industries follow the same structure; their copy mirrors the
 * design language and will be reconciled with the Figma source text.
 */
export const industryContent: Record<string, IndustryContent> = {
  "vertical-mobility": {
    statement:
      "Every day, billions of people move through buildings. Elevators, escalators, and mobility systems quietly carry the rhythm of modern cities. Yet few ever think about the infrastructure that makes that movement possible.",
    detailA:
      "Behind every elevator ride lies an invisible network of controllers, sensors, and mechanical systems working in quiet coordination. Every day, thousands of micro-decisions take place across buildings and cities — guiding movement, ensuring safety, and sustaining the rhythm of modern life.",
    detailB:
      "Much of this infrastructure was designed decades ago, in a time when connectivity and intelligent monitoring were not yet part of the equation. Understanding these hidden systems is the first step toward evolving them.",
    challengeTitle:
      "Despite their critical role in modern infrastructure, many vertical transportation systems still operate as isolated machines.",
    challengePoints: [
      "Limited visibility into real-time performance.",
      "Maintenance that reacts instead of anticipates.",
      "Operational data fragmented across systems and vendors.",
    ],
    challengeNote:
      "In a world where buildings are becoming smarter, vertical mobility often remains disconnected.",
    ecosystemHeadline: ["Not machines.", "An ecosystem."],
    ecosystemBody:
      "We see vertical transportation as an interconnected system. By introducing digital intelligence across controllers, sensors, and infrastructure layers, mobility systems become more visible, responsive, and resilient.",
    applicationsLead: "Here's where it applies",
    applications: [
      {
        title: "Passenger lifts",
        body: "The systems that quietly move people through offices, hospitals, airports, and towers every day.",
      },
      {
        title: "Cargo lifts",
        body: "Heavy-duty systems that keep logistics, industry, and infrastructure moving behind the scenes.",
      },
      {
        title: "High-speed lifts",
        body: "Precision-engineered mobility for the tallest buildings, where performance and safety are inseparable.",
      },
      {
        title: "Escalators and travelators",
        body: "Continuous flows of people through stations, airports, and public spaces.",
      },
      {
        title: "Controllers and smart components",
        body: "The decision-making layer that orchestrates movement, safety, and efficiency.",
      },
      {
        title: "Sensors and peripherals",
        body: "The sensing layer that turns mechanical systems into observable, data-rich infrastructure.",
      },
    ],
    closing: [
      "The future of vertical mobility won't be defined by speed alone.",
      "It will be defined by intelligence.",
    ],
  },
  "waste-treatment": {
    statement:
      "Every day, cities produce more than they can see. Waste streams move through plants and processes that quietly decide what is recovered, what is transformed, and what is lost.",
    detailA:
      "Behind every treatment plant lies a dense network of processing lines, sensors, and control systems working in coordination. Every hour, material flows are sorted, processed, and transformed — recovering value from what the world leaves behind.",
    detailB:
      "Much of this infrastructure still runs on isolated controls and manual oversight. Understanding these processes end to end is the first step toward making them intelligent.",
    challengeTitle:
      "Despite their environmental importance, many waste treatment plants still operate with fragmented visibility and reactive control.",
    challengePoints: [
      "Limited insight into real-time process performance.",
      "Energy and resource flows that go unmeasured.",
      "Data locked inside isolated equipment and vendors.",
    ],
    challengeNote:
      "In a world demanding circularity, waste treatment often remains a black box.",
    ecosystemHeadline: ["Not plants.", "Living processes."],
    ecosystemBody:
      "We see waste treatment as a connected process ecosystem. By introducing digital intelligence across processing lines, sensors, and plant infrastructure, treatment becomes observable, efficient, and accountable.",
    applicationsLead: "Here's where it applies",
    applications: [
      {
        title: "Waste-to-hydrocarbon",
        body: "Transformation processes that turn waste streams into recovered energy and materials.",
      },
      {
        title: "Process automation",
        body: "Orchestrating sorting, treatment, and recovery lines with precision and traceability.",
      },
      {
        title: "Plant integration",
        body: "Connecting equipment, controls, and data layers into one coherent system.",
      },
      {
        title: "Energy recovery",
        body: "Measuring and optimizing the energy balance of every process stage.",
      },
      {
        title: "Quality monitoring",
        body: "Continuous observation of material flows and output quality.",
      },
      {
        title: "Commissioning",
        body: "Bringing new lines and plants online with confidence, from concept to operation.",
      },
    ],
    closing: [
      "The future of waste treatment won't be defined by capacity alone.",
      "It will be defined by intelligence.",
    ],
  },
  telecommunications: {
    statement:
      "Every conversation, every transaction, every connected device depends on networks that operate silently in the background. Few ever think about the infrastructure that carries the world's communication.",
    detailA:
      "Behind every call and every packet lies a layered network of towers, antennas, and switching systems working in coordination. Every second, millions of routing decisions sustain the conversations and services of modern life.",
    detailB:
      "Much of this infrastructure has grown over decades, across generations of technology. Understanding these layered systems is the first step toward operating them intelligently.",
    challengeTitle:
      "Despite carrying the world's communication, much network infrastructure is still monitored in fragments and maintained reactively.",
    challengePoints: [
      "Limited end-to-end visibility across network layers.",
      "Maintenance that reacts instead of anticipates.",
      "Operational data scattered across systems and generations.",
    ],
    challengeNote:
      "In a world that never disconnects, the infrastructure behind it deserves the same awareness.",
    ecosystemHeadline: ["Not towers.", "A nervous system."],
    ecosystemBody:
      "We see telecommunications as a living network. By introducing digital intelligence across sites, equipment, and infrastructure layers, networks become more observable, resilient, and efficient.",
    applicationsLead: "Here's where it applies",
    applications: [
      {
        title: "Network infrastructure",
        body: "The towers, sites, and physical assets that carry modern communication.",
      },
      {
        title: "Site monitoring",
        body: "Continuous observation of power, climate, and equipment health across distributed sites.",
      },
      {
        title: "Connectivity systems",
        body: "The links and protocols that bind thousands of nodes into one network.",
      },
      {
        title: "Digital networks",
        body: "Software-defined layers that make infrastructure programmable and observable.",
      },
      {
        title: "Systems integration",
        body: "Bringing equipment from different vendors and eras into one coherent operation.",
      },
      {
        title: "Remote access",
        body: "Secure operation and diagnostics for infrastructure that spans territories.",
      },
    ],
    closing: [
      "The future of telecommunications won't be defined by coverage alone.",
      "It will be defined by intelligence.",
    ],
  },
  fashion: {
    statement:
      "Every garment carries an invisible history of machines, hands, and processes. Production lines quietly shape what the world wears. Yet few ever think about the infrastructure behind every stitch.",
    detailA:
      "Behind every collection lies a network of machines, production lines, and logistics working in coordination. Every day, thousands of operations decide quality, pace, and waste across the supply chain.",
    detailB:
      "Much of this industry still runs on disconnected machinery and manual tracking. Understanding these production systems is the first step toward making them intelligent.",
    challengeTitle:
      "Despite its creative pace, much of fashion production still operates as isolated machinery with limited traceability.",
    challengePoints: [
      "Limited visibility into production performance.",
      "Quality issues discovered too late.",
      "Supply chain data fragmented across partners.",
    ],
    challengeNote:
      "In a world demanding transparency, fashion production often remains opaque.",
    ecosystemHeadline: ["Not machines.", "A supply chain that thinks."],
    ecosystemBody:
      "We see fashion production as a connected system. By introducing digital intelligence across machinery, lines, and logistics, production becomes traceable, efficient, and responsive.",
    applicationsLead: "Here's where it applies",
    applications: [
      {
        title: "Production lines",
        body: "The machinery and processes that turn design into product, day after day.",
      },
      {
        title: "Quality monitoring",
        body: "Continuous observation of output quality across every stage.",
      },
      {
        title: "Traceability",
        body: "Following materials and products through every step of the chain.",
      },
      {
        title: "Inventory systems",
        body: "Knowing what exists, where it is, and where it's going — in real time.",
      },
      {
        title: "Supply chain",
        body: "Connecting partners, logistics, and production into one observable flow.",
      },
      {
        title: "Product lifecycle",
        body: "Intelligence that follows the product from concept to customer and beyond.",
      },
    ],
    closing: [
      "The future of fashion won't be defined by speed alone.",
      "It will be defined by intelligence.",
    ],
  },
  "food-beverage": {
    statement:
      "Every meal begins long before the table. Fields, processing lines, and cold chains quietly decide quality, safety, and waste. Yet few ever think about the infrastructure that feeds the world.",
    detailA:
      "Behind every product on a shelf lies a network of processing lines, sensors, and logistics working in coordination. Every day, countless measurements safeguard quality and keep production moving.",
    detailB:
      "Much of this infrastructure still operates with isolated controls and paper trails. Understanding these processes is the first step toward making them intelligent.",
    challengeTitle:
      "Despite feeding the world, much food production still runs with fragmented data and reactive quality control.",
    challengePoints: [
      "Limited real-time visibility across production lines.",
      "Quality and safety checks that come too late.",
      "Traceability fragmented across suppliers and systems.",
    ],
    challengeNote:
      "In a world demanding food transparency, production often remains invisible.",
    ecosystemHeadline: ["Not lines.", "A living chain."],
    ecosystemBody:
      "We see food production as a connected chain. By introducing digital intelligence across processing, packaging, and logistics, production becomes safe, traceable, and efficient.",
    applicationsLead: "Here's where it applies",
    applications: [
      {
        title: "Processing lines",
        body: "The systems that transform raw ingredients into finished products.",
      },
      {
        title: "Packaging systems",
        body: "Precision and pace where product meets package.",
      },
      {
        title: "Quality monitoring",
        body: "Continuous measurement of safety and quality at every stage.",
      },
      {
        title: "Traceability",
        body: "Following every batch from origin to shelf.",
      },
      {
        title: "Customer experience",
        body: "Intelligence that connects production decisions to what the customer tastes.",
      },
      {
        title: "Resource optimization",
        body: "Measuring and reducing energy, water, and waste across the plant.",
      },
    ],
    closing: [
      "The future of food & beverage won't be defined by volume alone.",
      "It will be defined by intelligence.",
    ],
  },
  "household-appliances": {
    statement:
      "Every home runs on machines no one thinks about. Appliances quietly wash, cool, and cook through millions of cycles. Yet few ever think about the intelligence those machines could carry.",
    detailA:
      "Behind every appliance lies a system of controllers, sensors, and components working in coordination. Every cycle generates signals about performance, wear, and use — most of it never heard.",
    detailB:
      "Much of this product category was designed before connectivity mattered. Understanding these embedded systems is the first step toward evolving them.",
    challengeTitle:
      "Despite living in every home, most appliances still operate as sealed boxes with no awareness of their own condition.",
    challengePoints: [
      "No visibility into real-world performance.",
      "Failures discovered only when machines stop.",
      "Product data that never returns to the maker.",
    ],
    challengeNote:
      "In a world of connected living, appliances often remain silent.",
    ecosystemHeadline: ["Not boxes.", "Connected products."],
    ecosystemBody:
      "We see appliances as connected products. By introducing digital intelligence across controllers, sensors, and product platforms, appliances become observable, serviceable, and smarter with every cycle.",
    applicationsLead: "Here's where it applies",
    applications: [
      {
        title: "Smart components",
        body: "The embedded layer that gives products awareness of their own state.",
      },
      {
        title: "Controllers",
        body: "The decision-making core of every cycle and program.",
      },
      {
        title: "IoT connectivity",
        body: "Bringing products online, securely and at scale.",
      },
      {
        title: "Data analytics",
        body: "Turning millions of cycles into insight about quality and use.",
      },
      {
        title: "Lifecycle management",
        body: "Following products from factory to home to service.",
      },
      {
        title: "Remote diagnostics",
        body: "Seeing and solving issues before the customer ever notices.",
      },
    ],
    closing: [
      "The future of household appliances won't be defined by features alone.",
      "It will be defined by intelligence.",
    ],
  },
  "building-automation": {
    statement:
      "Every building is a system of systems. Climate, light, energy, and security quietly negotiate comfort and safety. Yet few ever think about the intelligence that holds a building together.",
    detailA:
      "Behind every comfortable room lies a network of controllers, sensors, and actuators working in coordination. Every minute, a building makes thousands of small decisions about energy, air, and access.",
    detailB:
      "Much of this infrastructure was installed system by system, vendor by vendor. Understanding these layers is the first step toward making buildings truly aware.",
    challengeTitle:
      "Despite decades of automation, many buildings still run as collections of isolated systems rather than one intelligent whole.",
    challengePoints: [
      "Systems that don't speak to each other.",
      "Energy spent without measurement or intent.",
      "Operational data trapped in proprietary silos.",
    ],
    challengeNote:
      "In a world of smart everything, buildings often remain fragmented.",
    ecosystemHeadline: ["Not systems.", "One building, aware."],
    ecosystemBody:
      "We see buildings as living ecosystems. By connecting climate, lighting, energy, and security layers, buildings become observable, efficient, and responsive to the people inside them.",
    applicationsLead: "Here's where it applies",
    applications: [
      {
        title: "Climate systems",
        body: "Heating, cooling, and air that respond to real use, not schedules.",
      },
      {
        title: "Lighting control",
        body: "Light that follows occupancy, daylight, and intent.",
      },
      {
        title: "Energy management",
        body: "Measuring, predicting, and reducing every kilowatt.",
      },
      {
        title: "Access control",
        body: "Security that knows who, where, and when — without friction.",
      },
      {
        title: "Security systems",
        body: "Awareness across every entrance, sensor, and camera.",
      },
      {
        title: "Fire protection",
        body: "Safety systems that are tested, observable, and always ready.",
      },
    ],
    closing: [
      "The future of building automation won't be defined by devices alone.",
      "It will be defined by intelligence.",
    ],
  },
};
