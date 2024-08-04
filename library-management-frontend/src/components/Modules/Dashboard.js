import React, { useEffect, useState } from "react";
import helpers from "../Services/Helper";

function Dashboard() {
  const [data, setData] = useState([]);
  const getDashboardData = () => {
    document.getElementById("fp-container").style.visibility = "visible";
    helpers
      .dashboardData()
      .then((response) => {
        document.getElementById("fp-container").style.visibility = "hidden";
        console.log(response.data);

        setData(response.data);
      })
      .catch(function (error) {
        document.getElementById("fp-container").style.visibility = "hidden";
        alert(error.response.data.message);
      });
  };
  useEffect(() => {
    getDashboardData();
  }, []);

  return (
    <div>
      <div className="fluid-container">
        <div className="top_menu p-2 d-flex justify-content-start align-items-center">
          <div className="px-3">
            <i class="fa-solid fa-chart-line fa-2x icon_design "></i>
          </div>
          <div className="px-2 my-1">
            <h4 className="my-1">Dashboard</h4>
          </div>
        </div>

        <div>
          <div class="container">
            <div class="row p-5 justify-content-around">
              {data.map((value) => (
                <div class="col-lg-3 col-md-6 col-12 mb-4">
                  <div class="card h-100 ">
                    <div class="card-body p-4">
                      <div className="d-flex justify-content-between align-items-center">
                        <div
                          className="p-3 rounded"
                          style={{ background: value.color }}
                        >
                          <i className={`fa-solid ${value.icon}`}></i>
                        </div>
                        <div className="p-2 text-end">
                          <div>{value.words}</div>
                          <div>{value.count}</div>
                        </div>
                      </div>
                    </div>
                    <a
                      href="/RequestList"
                      className="text-center border-top p-1 text-decoration-none text-dark"
                    >
                      More Info <i class="fa-regular fa-circle-right"></i>
                    </a>
                  </div>
                </div>
              ))}
              {/* <div class="col-lg-3 col-md-6 col-12 mb-4">
                <div class="card h-100">
                  <img src="image2.jpg" class="card-img-top" alt="Image 2" />
                  <div class="card-body">
                    <h5 class="card-title">Card 2</h5>
                    <p class="card-text">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                  </div>
                </div>
              </div>
              <div class="col-lg-3 col-md-6 col-12 mb-4">
                <div class="card h-100">
                  <img src="image3.jpg" class="card-img-top" alt="Image 3" />
                  <div class="card-body">
                    <h5 class="card-title">Card 3</h5>
                    <p class="card-text">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                  </div>
                </div>
              </div>
              <div class="col-lg-3 col-md-6 col-12 mb-4">
                <div class="card h-100">
                  <img src="image4.jpg" class="card-img-top" alt="Image 4" />
                  <div class="card-body">
                    <h5 class="card-title">Card 4</h5>
                    <p class="card-text">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
      <div
        className="fp-container"
        id="fp-container"
        style={{ visibility: "hidden" }}
      >
        <i
          className="fas fa-spinner fa-pulse fp-loader"
          style={{ fontSize: "70px" }}
        ></i>
      </div>
    </div>
  );
}

export default Dashboard;
