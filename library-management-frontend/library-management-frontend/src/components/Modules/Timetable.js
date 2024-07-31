import React, { useState, useRef, useEffect } from "react";
import { DayPilot, DayPilotCalendar } from "@daypilot/daypilot-lite-react";
import { Button, Modal } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from "react-toastify";
import helpers from "../Services/Helper";
import moment from "moment";
import $ from "jquery";

const styles = {
  wrap: {
    display: "flex",
  },
  main: {
    overflow: "hidden",
    flexGrow: "1",
  },
};

const Timetable = ({
  prop_datas,
  prop_department,
  prop_semester,
  getTimetableDetails,
}) => {
  const calendarRef = useRef();
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [updatedays, setUpdateDays] = useState();
  const [updatesubject, setUpdateSubject] = useState();
  const [updatestart, setUpdateStart] = useState();
  const [updateend, setUpdateEnd] = useState();
  const [updateid, setUpdateId] = useState();
  const [department, setDepartment] = useState(prop_department);
  const [semester, setSemester] = useState(prop_semester);
  const [days, setDays] = useState();
  const [subject, setSubject] = useState();
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();

  function handleSaveModal() {
    setShowModal(true);
  }
  function handleCloseModal() {
    setShowModal(false);
  }

  const handleAddModal = () => setShowAddModal(true);
  const handleCloseAddModal = () => setShowAddModal(false);

  // editEvent function
  const editEvent = async (e) => {
    const updateStart = new Date(e.start().value);
    const updateEnd = new Date(e.end().value);
    updateStart.setHours(updateStart.getHours());
    updateStart.setMinutes(updateStart.getMinutes());
    updateEnd.setHours(updateEnd.getHours());
    updateEnd.setMinutes(updateEnd.getMinutes());

    setUpdateDays(e.data.days);
    setUpdateSubject(e.text());
    setUpdateStart(updateStart);
    setUpdateEnd(updateEnd);
    setUpdateId(e.data.id);

    handleSaveModal();
  };

  const deleteEvent = async (e) => {
    var confirmed = window.confirm("Are you sure you want to delete?");
    if (confirmed) {
      document.getElementById("fp-container").style.visibility = "visible";
      var datas = { values: e.data.id };
      helpers
        .deleteTimetable(datas)
        .then((response) => {
          document.getElementById("fp-container").style.visibility = "hidden";
          toast("Timetable Details Deleted Successfully.", {
            type: "success",
          });
          getTimetableDetails();
        })
        .catch(function (error) {
          document.getElementById("fp-container").style.visibility = "hidden";
          alert(error.response.data.message);
        });
    } else {
      // getBatchList();
    }
  };

  const [calendarConfig] = useState({
    viewType: "Days",
    days: 6, // Show only 3 days
    // viewType: "Week",
    durationBarVisible: false,
    startDate: "2024-01-01",
    headerDateFormat: "dddd", // Display only the day names
    businessBeginsHour: 9, // Start time range at 8 AM
    businessEndsHour: 17, // End time range at 6 PM
    showNonBusiness: false,
    timeRangeSelectedHandling: "Enabled",
    onTimeRangeSelected: async (args) => {
      const startTime = new Date(args.start.value);
      const endTime = new Date(args.end.value);
      startTime.setHours(startTime.getHours());
      startTime.setMinutes(startTime.getMinutes());
      endTime.setHours(endTime.getHours());
      endTime.setMinutes(endTime.getMinutes());
      setStartTime(startTime);
      setEndTime(endTime);
      setDays(startTime.getDate());
      handleAddModal();
    },
    onEventClick: async (args) => {
      await editEvent(args.e);
    },
    contextMenu: new DayPilot.Menu({
      items: [
        {
          text: "Delete",
          onClick: async (args) => {
            await deleteEvent(args.source);
          },
        },
        {
          text: "-",
        },
        {
          text: "Edit...",
          onClick: async (args) => {
            await editEvent(args.source);
          },
        },
      ],
    }),
    eventMoveHandling: "Disabled",
    onBeforeEventRender: (args) => {
      args.data.areas = [
        {
          top: 3,
          right: 3,
          width: 20,
          height: 20,
          symbol: "icons/daypilot.svg#minichevron-down-2",
          fontColor: "#fff",
          toolTip: "Show context menu",
          action: "ContextMenu",
        },
        {
          top: 3,
          right: 25,
          width: 20,
          height: 20,
          symbol: "icons/daypilot.svg#x-circle",
          fontColor: "#fff",
          action: "None",
          toolTip: "Delete event",
          onClick: async (args) => {
            const dp = calendarRef.current.control;
            dp.events.remove(args.source);
          },
        },
      ];

      // const participants = args.data.participants;
      // if (participants > 0) {
      //   for (let i = 0; i < participants; i++) {
      //     args.data.areas.push({
      //       bottom: 5,
      //       right: 5 + i * 30,
      //       width: 24,
      //       height: 24,
      //       action: "None",
      //       image: `https://picsum.photos/24/24?random=${i}`,
      //       style:
      //         "border-radius: 50%; border: 2px solid #fff; overflow: hidden;",
      //     });
      //   }
      // }
    },
  });

  useEffect(() => {
    const events = prop_datas;
    const startDate = "2024-01-01";
    calendarRef.current.control.update({ startDate, events });
  }, []);

  function handleUpdateTimetable() {
    if (updatedays && updatesubject && updatestart && updateend) {
      if (updateend > updatestart) {
        var datas = {
          updateid,
          updatedays,
          updatesubject,
          department,
          semester,
          start_time: moment(updatestart).format("HH:mm:ss"),
          end_time: moment(updateend).format("HH:mm:ss"),
        };
        document.getElementById("fp-container").style.visibility = "visible";
        helpers
          .updateTimetable(datas)
          .then((response) => {
            document.getElementById("fp-container").style.visibility = "hidden";
            if (response.data == 0) {
              toast("Timetable Details Updated Successfully.", {
                type: "success",
              });
              handleCloseModal();
              getTimetableDetails();
            } else {
              toast(
                "Sorry, the selected time ranges already have some other subjects allotted.",
                {
                  type: "info",
                }
              );
            }
          })
          .catch(function (error) {
            document.getElementById("fp-container").style.visibility = "hidden";
            alert(error.response.data.message);
          });
      } else {
        toast("End Time should not be greater than startTime", {
          type: "info",
        });
      }
    } else {
      document.getElementById("fp-container").style.visibility = "hidden";
      toast("Please fill the mandatory fields", {
        type: "info",
      });
    }
  }

  function addTimetable() {
    if (department && semester && days && subject && startTime && endTime) {
      if (endTime > startTime) {
        document.getElementById("fp-container").style.visibility = "visible";
        var datas = {
          department,
          semester,
          days,
          subject: subject.toLowerCase(),
          start_time: moment(startTime).format("HH:mm:ss"),
          end_time: moment(endTime).format("HH:mm:ss"),
        };
        helpers
          .addTimetableDetails(datas)
          .then((response) => {
            document.getElementById("fp-container").style.visibility = "hidden";
            //console.log(response.data);
            if (response.data == 0) {
              toast("Timetable Details Added Successfully.", {
                type: "success",
              });
              setSubject("");
              getTimetableDetails();
            } else {
              toast(
                "Sorry, the selected time ranges already have some other subjects allotted.",
                {
                  type: "info",
                }
              );
            }
          })
          .catch(function (error) {
            document.getElementById("fp-container").style.visibility = "hidden";
            alert(error.response.data.message);
          });
      } else {
        toast("End Time should not be greater than startTime", {
          type: "info",
        });
      }
    } else {
      document.getElementById("fp-container").style.visibility = "hidden";
      toast("Please fill the mandatory fields", {
        type: "info",
      });
    }
  }

  function reset() {
    setDepartment("");
    setSemester("");
    setDays("");
    setSubject("");
    setStartTime("");
    setEndTime("");
  }
  return (
    <div>
      <div style={styles.wrap}>
        <div style={styles.main}>
          <DayPilotCalendar {...calendarConfig} ref={calendarRef} />
        </div>
      </div>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Events</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div class="modal-body">
            <div class="row my-2">
              <div className="col-md-6">
                <label className="control-label m-0">
                  Week days
                  <span className="text-danger"> *</span>
                </label>
                <select
                  class="form-select"
                  aria-label="Default select example"
                  value={updatedays}
                  onChange={(event) => {
                    setUpdateDays(event.target.value);
                  }}
                >
                  <option value="">Select</option>
                  <option value="1">Monday</option>
                  <option value="2">Tuesday</option>
                  <option value="3">Wednesday</option>
                  <option value="4">Thursday</option>
                  <option value="5">Friday</option>
                  <option value="6">Saturday</option>
                </select>
              </div>
              <div className="col-md-6">
                <label className="control-label m-0">
                  Subject
                  <span className="text-danger"> *</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={updatesubject}
                  onChange={(e) => setUpdateSubject(e.target.value)}
                />
              </div>
            </div>
            <div className="row py-2">
              <div className="col-md-6">
                <label className="control-label m-0">
                  Start time
                  <span className="text-danger"> *</span>
                </label>
                <DatePicker
                  className="form-control"
                  selected={updatestart}
                  onChange={(date) => setUpdateStart(date)}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={30}
                  timeCaption="Time"
                  dateFormat="h:mm aa"
                />
              </div>
              <div className="col-md-6">
                <label className="control-label m-0">
                  End time
                  <span className="text-danger"> *</span>
                </label>
                <DatePicker
                  className="form-control"
                  selected={updateend}
                  onChange={(date) => setUpdateEnd(date)}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={30}
                  timeCaption="Time"
                  dateFormat="h:mm aa"
                />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdateTimetable}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showAddModal} onHide={handleCloseAddModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Add Events</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div class="modal-body">
            <div class="row">
              <div className="col-4">
                <label className="control-label m-0">
                  Department
                  <span className="text-danger"> *</span>
                </label>
                <select
                  class="form-select"
                  aria-label="Default select example"
                  value={department}
                  onChange={(event) => {
                    setDepartment(event.target.value);
                  }}
                >
                  <option value="">Select</option>
                  <option value="1">MCA</option>
                </select>
              </div>
              <div className="col-4">
                <label className="control-label m-0">
                  Semester
                  <span className="text-danger"> *</span>
                </label>
                <select
                  class="form-select"
                  aria-label="Default select example"
                  value={semester}
                  onChange={(event) => {
                    setSemester(event.target.value);
                  }}
                >
                  <option value="">Select</option>
                  <option value="1">Semester 1</option>
                  <option value="2">Semester 2</option>
                  <option value="3">Semester 3</option>
                  <option value="4">Semester 4</option>
                </select>
              </div>
              <div className="col-4">
                <label className="control-label m-0">
                  Week days
                  <span className="text-danger"> *</span>
                </label>
                <select
                  class="form-select"
                  aria-label="Default select example"
                  value={days}
                  onChange={(event) => {
                    setDays(event.target.value);
                  }}
                >
                  <option value="">Select</option>
                  <option value="1">Monday</option>
                  <option value="2">Tuesday</option>
                  <option value="3">Wednesday</option>
                  <option value="4">Thursday</option>
                  <option value="5">Friday</option>
                  <option value="6">Saturday</option>
                </select>
              </div>
            </div>
            <div className="row">
              <div className="col-4">
                <label className="control-label m-0">
                  Subject
                  <span className="text-danger"> *</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>
              <div className="col-4">
                <label className="control-label m-0">
                  Start time
                  <span className="text-danger"> *</span>
                </label>
                <DatePicker
                  className="form-control"
                  selected={startTime}
                  onChange={(date) => setStartTime(date)}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={30}
                  timeCaption="Time"
                  dateFormat="h:mm aa"
                />
              </div>
              <div className="col-4">
                <label className="control-label m-0">
                  End time
                  <span className="text-danger"> *</span>
                </label>
                <DatePicker
                  className="form-control"
                  selected={endTime}
                  onChange={(date) => setEndTime(date)}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={30}
                  timeCaption="Time"
                  dateFormat="h:mm aa"
                />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddModal}>
            Close
          </Button>
          <Button variant="primary" onClick={addTimetable}>
            Add Timetable
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Timetable;
