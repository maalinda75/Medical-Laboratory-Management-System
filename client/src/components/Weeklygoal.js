import React, {useState , useEffect} from "react";
import axios from "axios";
// import { CircularProgressbar } from 'react-circular-progressbar';
// import 'react-circular-progressbar/dist/styles.css';
import { useParams, useNavigate} from 'react-router-dom';
import NavBar from "./NavBar";

export default function Weeklygoal() {
  const {id} = useParams();
    const [daysPerWeek, setDaysPerWeek] = useState(0);
    const [notes, setNotes] =useState('');
    const navigate = useNavigate();

    useEffect(() => {
        function getGoal(){
            axios.get(`http://localhost:8070/goals/get/${id}`).then((res) => {
                setDaysPerWeek(res.data.display.daysPerWeek);
                setNotes(res.data.display.notes);
            }).catch((err) => {
                alert(err.message);
            }) 
        }
        getGoal()
    }, [id])

    return(
      <><NavBar/>
        <div className="bigcontainer">
      <h1>Set Your Schedule</h1>
      <div className="description-container">
            <p>You're more likely to reach your goal if you dedicate some days for
              complit your schedule. Select number of days and choose the days that
              work for you.
            </p>
          </div>
      <form>
      <label>
          Days per week:

          <input type="text" style={{ width: '50px' }} value={daysPerWeek} disabled/>
         
          {/* <div style={{ width: '100px' }}>
            <CircularProgressbar
                value={daysPerWeek}
                text={`${daysPerWeek}%`}
                strokeWidth={10}
                styles={{
                path: {
                    stroke: '#3E98C7',
                    strokeLinecap: 'butt',
                },
                trail: {
                    stroke: '#F4F4F4',
                },
                text: {
                    fill: '#3E98C7',
                    fontSize: '30px',
                },
                }}
            />
          </div> */}
          
          

        </label>
        <label>
          Notes:
<br />
          <textarea type="text" value={notes} disabled/>
         
          {/* <div style={{ width: '100px' }}>
            <CircularProgressbar
                value={daysPerWeek}
                text={`${daysPerWeek}%`}
                strokeWidth={10}
                styles={{
                path: {
                    stroke: '#3E98C7',
                    strokeLinecap: 'butt',
                },
                trail: {
                    stroke: '#F4F4F4',
                },
                text: {
                    fill: '#3E98C7',
                    fontSize: '30px',
                },
                }}
            />
          </div> */}
          
          

        </label>
        <button type="submit" className="btn btn-primary" onClick={() => navigate(`/updategoal/${id}`)}>
          Update Goal
        </button>
      
      </form>
    </div>
    </>
    )
}


