import { getAppointments } from '../../../lib/storage';

export default function handler(req, res) {
    const { date } = req.query;

    if (req.method === 'GET') {
        const timeSlots = [
            '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
            '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM'
        ];

        // Filter out already booked slots for the date
        // Note: This simple check assumes any doctor booking blocks the slot. 
        // For specific doctor availability, we'd need to filter by doctorId as well, 
        // but the current frontend request for time-slots only passes date.
        // We'll stick to the server.js logic which filtered by date.

        const appointments = getAppointments();
        const bookedSlots = appointments
            .filter(apt => apt.date === date && apt.status !== 'cancelled')
            .map(apt => apt.time);

        const availableSlots = timeSlots.filter(slot => !bookedSlots.includes(slot));
        res.status(200).json(availableSlots);
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
