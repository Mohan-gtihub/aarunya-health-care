const departments = [
    {
        id: 'cardiology',
        name: 'Cardiology',
        doctors: [
            { id: 1, name: 'Dr. Ramesh Kumar', email: 'ramesh.kumar@aarunyahealthcare.com', specialization: 'Interventional Cardiology' },
            { id: 2, name: 'Dr. Priya Sharma', email: 'priya.sharma@aarunyahealthcare.com', specialization: 'Clinical Cardiology' }
        ]
    },
    {
        id: 'neurology',
        name: 'Neurology',
        doctors: [
            { id: 3, name: 'Dr. Amit Patel', email: 'amit.patel@aarunyahealthcare.com', specialization: 'Neurophysiology' },
            { id: 4, name: 'Dr. Sunita Reddy', email: 'sunita.reddy@aarunyahealthcare.com', specialization: 'Stroke Medicine' }
        ]
    },
    {
        id: 'orthopedics',
        name: 'Orthopedics',
        doctors: [
            { id: 5, name: 'Dr. Vikram Singh', email: 'vikram.singh@aarunyahealthcare.com', specialization: 'Joint Replacement' },
            { id: 6, name: 'Dr. Anjali Gupta', email: 'anjali.gupta@aarunyahealthcare.com', specialization: 'Spine Surgery' }
        ]
    },
    {
        id: 'pediatrics',
        name: 'Pediatrics',
        doctors: [
            { id: 7, name: 'Dr. Meera Joshi', email: 'meera.joshi@aarunyahealthcare.com', specialization: 'Pediatric Cardiology' },
            { id: 8, name: 'Dr. Rohan Verma', email: 'rohan.verma@aarunyahealthcare.com', specialization: 'Neonatology' }
        ]
    },
    {
        id: 'general',
        name: 'General Medicine',
        doctors: [
            { id: 9, name: 'Dr. Ashok Rao', email: 'ashok.rao@aarunyahealthcare.com', specialization: 'Internal Medicine' },
            { id: 10, name: 'Dr. Lakshmi Nair', email: 'lakshmi.nair@aarunyahealthcare.com', specialization: 'Family Medicine' }
        ]
    }
];

export default function handler(req, res) {
    if (req.method === 'GET') {
        res.status(200).json(departments);
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
