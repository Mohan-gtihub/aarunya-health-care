import { NextResponse } from 'next/server'

// This would be shared with appointments route in a real app
// For now, we'll use a simple in-memory store
const appointments = []

export async function GET(request, { params }) {
    const { date } = params

    const timeSlots = [
        '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
        '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM'
    ]

    // Filter out already booked slots for the date
    const bookedSlots = appointments
        .filter(apt => apt.date === date)
        .map(apt => apt.time)

    const availableSlots = timeSlots.filter(slot => !bookedSlots.includes(slot))

    return NextResponse.json(availableSlots)
}
