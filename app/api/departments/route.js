import { NextResponse } from 'next/server'

// Doctors and departments data
const departments = [
    {
        id: 'cardiology',
        name: 'Cardiology',
        doctors: [
            { id: 1, name: 'Dr. Ramesh Kumar', email: 'mohankilarisai@gmail.com', specialization: 'Interventional Cardiology' },
            { id: 2, name: 'Dr. Priya Sharma', email: 'mohankilarisai@gmail.com', specialization: 'Clinical Cardiology' }
        ]
    },
    {
        id: 'neurology',
        name: 'Neurology',
        doctors: [
            { id: 3, name: 'Dr. Amit Patel', email: 'mohankilarisai@gmail.com', specialization: 'Neurophysiology' },
            { id: 4, name: 'Dr. Sunita Reddy', email: 'mohankilarisai@gmail.com', specialization: 'Stroke Medicine' }
        ]
    },
    {
        id: 'orthopedics',
        name: 'Orthopedics',
        doctors: [
            { id: 5, name: 'Dr. Vikram Singh', email: 'mohankilarisai@gmail.com', specialization: 'Joint Replacement' },
            { id: 6, name: 'Dr. Anjali Gupta', email: 'mohankilarisai@gmail.com', specialization: 'Spine Surgery' }
        ]
    },
    {
        id: 'pediatrics',
        name: 'Pediatrics',
        doctors: [
            { id: 7, name: 'Dr. Meera Joshi', email: 'mohankilarisai@gmail.com', specialization: 'Pediatric Cardiology' },
            { id: 8, name: 'Dr. Rohan Verma', email: 'mohankilarisai@gmail.com', specialization: 'Neonatology' }
        ]
    },
    {
        id: 'general',
        name: 'General Medicine',
        doctors: [
            { id: 9, name: 'Dr. Ashok Rao', email: 'mohankilarisai@gmail.com', specialization: 'Internal Medicine' },
            { id: 10, name: 'Dr. Lakshmi Nair', email: 'mohankilarisai@gmail.com', specialization: 'Family Medicine' }
        ]
    }
]

export async function GET() {
    return NextResponse.json(departments)
}
