# WhatsApp Number Fields - Admin Panel Integration

## Status: PARTIALLY COMPLETE

### ✅ What's Done:
1. Database schema ready (`whatsapp_number` field added to doctors table)
2. `admin_settings` table created for admin WhatsApp
3. State variables added to admin.jsx:
   - `doctorForm.whatsapp_number`
   - `adminSettings.admin_whatsapp_number`
4. WhatsApp notification functions created
5. Integration with appointment booking complete

### ⚠️ What's Needed:

#### 1. Add WhatsApp Field to Doctor Form UI

Find the doctor form in admin.jsx (around line 1700-1900) and add this field after the phone field:

```jsx
<div className="form-group">
    <label>WhatsApp Number</label>
    <input
        type="tel"
        value={doctorForm.whatsapp_number}
        onChange={(e) => setDoctorForm({ ...doctorForm, whatsapp_number: e.target.value })}
        placeholder="+91 9876543210"
    />
    <small style={{ color: '#888', fontSize: '0.85rem', marginTop: '0.5rem', display: 'block' }}>
        💡 This number will receive appointment notifications via WhatsApp
    </small>
</div>
```

#### 2. Add Settings Tab

Add a new tab button in the admin tabs section (around line 1240-1290):

```jsx
<button
    className={`admin-tab ${activeTab === 'settings' ? 'active' : ''}`}
    onClick={() => setActiveTab('settings')}
>
    ⚙️ Settings
</button>
```

#### 3. Load Admin Settings

Add to useEffect (around line 100-115):

```javascript
else if (activeTab === 'settings') {
    loadAdminSettings();
}
```

#### 4. Create loadAdminSettings Function

Add this function with other load functions (around line 900-950):

```javascript
const loadAdminSettings = async () => {
    try {
        setLoading(true);
        const { data, error } = await supabase
            .from('admin_settings')
            .select('*');
        
        if (error) throw error;
        
        // Convert array to object
        const settings = {};
        data.forEach(setting => {
            settings[setting.setting_key] = setting.setting_value;
        });
        
        setAdminSettings(settings);
    } catch (error) {
        console.error('Error loading admin settings:', error);
        showMessage('error', 'Failed to load settings');
    } finally {
        setLoading(false);
    }
};
```

#### 5. Create saveAdminSettings Function

```javascript
const saveAdminSettings = async () => {
    try {
        setLoading(true);
        
        // Update or insert admin WhatsApp number
        const { error } = await supabase
            .from('admin_settings')
            .upsert({
                setting_key: 'admin_whatsapp_number',
                setting_value: adminSettings.admin_whatsapp_number
            }, {
                onConflict: 'setting_key'
            });
        
        if (error) throw error;
        
        showMessage('success', 'Settings saved successfully!');
    } catch (error) {
        console.error('Error saving settings:', error);
        showMessage('error', 'Failed to save settings');
    } finally {
        setLoading(false);
    }
};
```

#### 6. Create Settings Tab UI

Add this section with other tab content (around line 2400-2450):

```jsx
{/* Settings Tab */}
{activeTab === 'settings' && (
    <div className="settings-section">
        <h2>⚙️ Settings</h2>
        
        <div className="settings-card">
            <h3>📱 WhatsApp Notifications</h3>
            <p style={{ color: '#888', marginBottom: '1.5rem' }}>
                Configure WhatsApp numbers for receiving notifications
            </p>
            
            <div className="form-group">
                <label>Admin WhatsApp Number</label>
                <input
                    type="tel"
                    value={adminSettings.admin_whatsapp_number}
                    onChange={(e) => setAdminSettings({ 
                        ...adminSettings, 
                        admin_whatsapp_number: e.target.value 
                    })}
                    placeholder="+91 9876543210"
                />
                <small style={{ color: '#888', fontSize: '0.85rem', marginTop: '0.5rem', display: 'block' }}>
                    💡 This number will receive all appointment and package booking notifications
                </small>
            </div>
            
            <button 
                className="btn-submit" 
                onClick={saveAdminSettings}
                disabled={loading}
            >
                {loading ? 'Saving...' : '✓ Save Settings'}
            </button>
        </div>
        
        <div className="settings-card" style={{ marginTop: '2rem' }}>
            <h3>ℹ️ How WhatsApp Notifications Work</h3>
            <ul style={{ lineHeight: '1.8', color: '#ccc' }}>
                <li>When a patient books an appointment, WhatsApp windows will open automatically</li>
                <li>Patient receives confirmation message</li>
                <li>Selected doctor receives appointment details</li>
                <li>Admin receives complete information</li>
                <li>Make sure to add WhatsApp numbers to doctor profiles</li>
            </ul>
        </div>
    </div>
)}
```

#### 7. Update Doctor Save Function

Find the doctor save/create function and ensure `whatsapp_number` is included in the insert/update:

```javascript
const { data, error } = await supabase
    .from('doctors')
    .insert([{
        ...doctorForm,
        whatsapp_number: doctorForm.whatsapp_number  // Ensure this is included
    }])
    .select();
```

### 📝 Quick Implementation Steps:

1. Run `whatsapp-notifications-setup.sql` in Supabase SQL Editor
2. Add the code snippets above to admin.jsx
3. Test by:
   - Going to Settings tab
   - Adding admin WhatsApp number
   - Going to Doctors tab
   - Adding WhatsApp number to a doctor
   - Booking a test appointment
   - Checking if WhatsApp windows open

### 🎯 Expected Result:

After implementation:
- Settings tab visible in admin panel
- Can set admin WhatsApp number
- Doctor form has WhatsApp field
- All numbers saved to database
- Notifications work when booking appointments

### ⚠️ Note:

The exact line numbers may vary. Search for:
- "Doctor form" or "doctorForm" for doctor UI
- "admin-tab" for tab buttons
- "activeTab ===" for tab content sections
