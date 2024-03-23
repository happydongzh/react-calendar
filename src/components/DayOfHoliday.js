const DayOfHoliday = ({ holiday }) => {

    return <div>
        <h5>{holiday.name}</h5><span>{holiday.day}</span>
    </div>

}

export default DayOfHoliday;