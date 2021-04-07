import { useState } from 'react';
import DayTimePicker from '@mooncake-dev/react-day-time-picker';

const AddTask = ({onAdd}) => {
    const [text, setText] = useState('');
    const [day, setDay] = useState('');
    const [reminder, setReminder] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();
        if(!text) {
            alert('Add a task');
            return;
        }

        onAdd({text, day, reminder});

        setText('');
        setDay('');
        setReminder(false);
    }

    const onChange = (value) => {
        setDay(value);
    }

    return (
        <form className='add-form' onSubmit={onSubmit}>
            <div className='form-control'>
                <label>Task</label>
                <input type='text' placeholder='Add Task' value={text} onChange={(e) => setText(e.target.value)} />
            </div>
            <div className='form-control form-control-check'>
                <label>Set Reminder</label>
                <input type='checkbox'  value={reminder} checked={reminder} onChange={(e) => setReminder(e.currentTarget.checked)}/>
            </div>
            <div className='form-control'>
                <label>Day & Time</label>
                <DayTimePicker timeSlotSizeMinutes={15} onConfirm={onChange} />
            </div>
        </form>
    )
}

export default AddTask
