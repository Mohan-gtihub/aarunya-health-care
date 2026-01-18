import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
    const dataDir = path.join(process.cwd(), 'data');
    const appointmentsFile = path.join(dataDir, 'appointments.json');

    // Ensure data directory exists
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
    }

    // Helper to read appointments
    const readAppointments = () => {
        if (!fs.existsSync(appointmentsFile)) {
            return [];
        }
        const fileContent = fs.readFileSync(appointmentsFile, 'utf-8');
        return JSON.parse(fileContent);
    };

    // Helper to write appointments
    const writeAppointments = (appointments) => {
        fs.writeFileSync(appointmentsFile, JSON.stringify(appointments, null, 2));
    };

    try {
        if (req.method === 'GET') {
            // Get all popup appointments
            const appointments = readAppointments();
            return res.status(200).json(appointments);
        }

        if (req.method === 'PATCH') {
            // Update appointment status
            const { id, status } = req.body;
            const appointments = readAppointments();
            const index = appointments.findIndex(apt => apt.id === id);

            if (index === -1) {
                return res.status(404).json({ error: 'Appointment not found' });
            }

            appointments[index].status = status;
            appointments[index].updated_at = new Date().toISOString();
            writeAppointments(appointments);

            return res.status(200).json({ success: true, appointment: appointments[index] });
        }

        if (req.method === 'DELETE') {
            // Delete appointment
            const { id } = req.body;
            const appointments = readAppointments();
            const filtered = appointments.filter(apt => apt.id !== id);

            if (filtered.length === appointments.length) {
                return res.status(404).json({ error: 'Appointment not found' });
            }

            writeAppointments(filtered);
            return res.status(200).json({ success: true });
        }

        return res.status(405).json({ error: 'Method not allowed' });

    } catch (error) {
        console.error('Error in popup-appointments API:', error);
        return res.status(500).json({
            error: 'Internal server error',
            details: error.message
        });
    }
}
