// Simple in-memory storage for development/demo purposes
// Note: In a real serverless production environment, this should be replaced with a database (e.g., MongoDB, PostgreSQL, Firebase)
// because this data will be lost when the serverless function container recycles.

let appointments = [];
let appointmentIdCounter = 1;

export const getAppointments = () => appointments;

export const addAppointment = (appointment) => {
    const newAppointment = {
        ...appointment,
        id: appointmentIdCounter++,
        createdAt: new Date().toISOString(),
        status: 'confirmed'
    };
    appointments.push(newAppointment);
    return newAppointment;
};

export const findAppointmentById = (id) => appointments.find(a => a.id === parseInt(id));

export const updateAppointmentStatus = (id, status) => {
    const appointment = findAppointmentById(id);
    if (appointment) {
        appointment.status = status;
        if (status === 'cancelled') {
            appointment.cancelledAt = new Date().toISOString();
        }
        return appointment;
    }
    return null;
};
