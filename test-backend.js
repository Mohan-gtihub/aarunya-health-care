// Test script to verify backend endpoints

async function testBackend() {
  try {
    // Test departments endpoint
    console.log('Testing /api/departments...');
    const deptsResponse = await fetch('http://localhost:5000/api/departments');
    const departments = await deptsResponse.json();
    console.log('Departments:', departments.length, 'found');

    // Test time slots endpoint
    console.log('\nTesting /api/time-slots/2024-12-25...');
    const slotsResponse = await fetch('http://localhost:5000/api/time-slots/2024-12-25');
    const slots = await slotsResponse.json();
    console.log('Available slots:', slots);

    // Test appointment booking
    console.log('\nTesting appointment booking...');
    const appointmentResponse = await fetch('http://localhost:5000/api/appointments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        department: 'cardiology',
        doctor: 'Dr. Ramesh Kumar',
        date: '2024-12-25',
        time: '09:00 AM',
        patientName: 'Test Patient',
        patientEmail: 'test@example.com',
        patientPhone: '1234567890',
        reason: 'Test appointment'
      }),
    });

    if (appointmentResponse.ok) {
      const result = await appointmentResponse.json();
      console.log('Appointment booked:', result);
    } else {
      const error = await appointmentResponse.json();
      console.error('Booking failed:', error);
    }
  } catch (error) {
    console.error('Backend test failed:', error.message);
  }
}

testBackend();
