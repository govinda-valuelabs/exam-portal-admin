<template>
  <div class="card flex justify-content-center">
    <Sidebar :visible="visible" @update:visible="closeSidebar()">
      <template #container="{ closeCallback }">
        <div class="flex flex-column h-full">
          <div class="flex align-items-center justify-content-between px-2 pt-2 flex-shrink-0">
            <span class="inline-flex align-items-center gap-2">
              <img src="../assets/Logo.png" alt="Logo" class="exam-logo" />
              <span class="font-semibold text-primary">Survey Portal</span>
            </span>
            <span>
              <Button type="button" @click="closeSidebar()" icon="pi pi-times" rounded outlined
                class="h-2rem w-2rem"></Button>
            </span>
          </div>
          <div class="overflow-y-auto">
            <ul class="list-none p-3 m-0">
              <li>
                <router-link to="/" v-ripple
                  class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple">
                  <svg width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                      <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M21.5315 11.5857L20.75 10.9605V21.25H22C22.4142 21.25 22.75 21.5858 22.75 22C22.75 22.4143 22.4142 22.75 22 22.75H2.00003C1.58581 22.75 1.25003 22.4143 1.25003 22C1.25003 21.5858 1.58581 21.25 2.00003 21.25H3.25003V10.9605L2.46855 11.5857C2.1451 11.8445 1.67313 11.792 1.41438 11.4686C1.15562 11.1451 1.20806 10.6731 1.53151 10.4144L9.65742 3.91366C11.027 2.818 12.9731 2.818 14.3426 3.91366L22.4685 10.4144C22.792 10.6731 22.8444 11.1451 22.5857 11.4686C22.3269 11.792 21.855 11.8445 21.5315 11.5857ZM12 6.75004C10.4812 6.75004 9.25003 7.98126 9.25003 9.50004C9.25003 11.0188 10.4812 12.25 12 12.25C13.5188 12.25 14.75 11.0188 14.75 9.50004C14.75 7.98126 13.5188 6.75004 12 6.75004ZM13.7459 13.3116C13.2871 13.25 12.7143 13.25 12.0494 13.25H11.9507C11.2858 13.25 10.7129 13.25 10.2542 13.3116C9.76255 13.3777 9.29128 13.5268 8.90904 13.9091C8.52679 14.2913 8.37773 14.7626 8.31163 15.2542C8.24996 15.7129 8.24999 16.2858 8.25003 16.9507L8.25003 21.25H9.75003H14.25H15.75L15.75 16.9507L15.75 16.8271C15.7498 16.2146 15.7462 15.6843 15.6884 15.2542C15.6223 14.7626 15.4733 14.2913 15.091 13.9091C14.7088 13.5268 14.2375 13.3777 13.7459 13.3116Z"
                        fill="#33F6FF"></path>
                      <g opacity="0.5">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                          d="M10.75 9.5C10.75 8.80964 11.3096 8.25 12 8.25C12.6904 8.25 13.25 8.80964 13.25 9.5C13.25 10.1904 12.6904 10.75 12 10.75C11.3096 10.75 10.75 10.1904 10.75 9.5Z"
                          fill="#33F6FF"></path>
                        <path fill-rule="evenodd" clip-rule="evenodd"
                          d="M10.75 9.5C10.75 8.80964 11.3096 8.25 12 8.25C12.6904 8.25 13.25 8.80964 13.25 9.5C13.25 10.1904 12.6904 10.75 12 10.75C11.3096 10.75 10.75 10.1904 10.75 9.5Z"
                          fill="#33F6FF"></path>
                      </g>
                      <path opacity="0.5"
                        d="M12.0494 13.25C12.7142 13.25 13.2871 13.2499 13.7458 13.3116C14.2375 13.3777 14.7087 13.5268 15.091 13.909C15.4732 14.2913 15.6223 14.7625 15.6884 15.2542C15.7462 15.6842 15.7498 16.2146 15.75 16.827L15.75 21.25H8.25L8.25 16.9506C8.24997 16.2858 8.24993 15.7129 8.31161 15.2542C8.37771 14.7625 8.52677 14.2913 8.90901 13.909C9.29126 13.5268 9.76252 13.3777 10.2542 13.3116C10.7129 13.2499 11.2858 13.25 11.9506 13.25H12.0494Z"
                        fill="#33F6FF"></path>
                      <path opacity="0.5"
                        d="M16 3H18.5C18.7761 3 19 3.22386 19 3.5L19 7.63955L15.5 4.83955V3.5C15.5 3.22386 15.7239 3 16 3Z"
                        fill="#33F6FF"></path>
                    </g>
                  </svg>
                  <span class="font-medium ml-2">Dashboard</span>
                </router-link>
              </li>
              <li>
                <router-link to="/admin" v-ripple
                  class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple">
                  <svg height="24px" width="24px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 508.609 508.609" xml:space="preserve"
                    fill="#000000">
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                      <path style="fill: #8a6753"
                        d="M463.513,508.609H45.097v-74.935c0-34.925,26.109-64.085,60.355-68.493l92.228-36.62h113.25 l92.228,36.62c34.585,4.069,60.355,33.568,60.355,68.493V508.609z">
                      </path>
                      <path style="fill: #7d5e4a"
                        d="M178.013,348.567v33.568c0,42.723,34.924,78.665,77.648,77.987 c41.367-0.678,74.596-34.585,74.596-76.291v-35.264c0-12.207-9.833-22.04-22.04-22.04H199.714 C187.846,326.866,178.013,336.699,178.013,348.567z">
                      </path>
                      <path style="fill: #eeb490"
                        d="M202.087,300.419v55.608c0,28.821,23.396,52.217,52.217,52.217l0,0 c28.821,0,52.217-23.396,52.217-52.217v-55.608H202.087z">
                      </path>
                      <g>
                        <path style="fill: #56545f"
                          d="M254.305,0L254.305,0C182.76,0,125.118,57.981,125.118,129.187v34.585 c0,44.079,35.603,79.682,79.682,79.682h50.522l59.677-185.473c7.46-23.396-6.103-48.487-30.177-54.252 C274.988,1.356,264.816,0,254.305,0z">
                        </path>
                        <path style="fill: #56545f"
                          d="M312.625,65.78l-57.303,177.674h48.487c44.079,0,79.682-35.603,79.682-79.682v-34.585 c0-26.109-7.799-50.522-21.023-70.866C349.584,38.993,319.746,43.401,312.625,65.78z">
                        </path>
                      </g>
                      <path style="fill: #faccb4"
                        d="M306.861,94.601H201.748c-24.752,0-44.758,20.005-44.758,44.758v100.705 c0,53.913,43.74,97.314,97.314,97.314l0,0c53.913,0,97.314-43.74,97.314-97.314V139.359 C351.619,114.607,331.613,94.601,306.861,94.601z">
                      </path>
                      <g>
                        <path style="fill: #f1f3f7"
                          d="M231.926,204.122h-44.079c-6.442,0-11.868-5.425-11.868-11.868V168.18 c0-6.442,5.425-11.868,11.868-11.868h44.079c6.442,0,11.868,5.425,11.868,11.868v24.074 C243.454,198.697,238.368,204.122,231.926,204.122z">
                        </path>
                        <path style="fill: #f1f3f7"
                          d="M320.763,204.122h-44.079c-6.442,0-11.868-5.425-11.868-11.868V168.18 c0-6.442,5.425-11.868,11.868-11.868h44.079c6.442,0,11.868,5.425,11.868,11.868v24.074 C332.63,198.697,327.205,204.122,320.763,204.122z">
                        </path>
                      </g>
                    </g>
                  </svg>
                  <span class="font-medium ml-2">Admin</span>
                </router-link>
              </li>
              <li>
                <router-link to="/user" v-ripple
                  class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple">
                  <svg height="24px" width="24px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 508.609 508.609" xml:space="preserve"
                    fill="#000000">
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                      <g>
                        <circle style="fill: #eeb490" cx="150.887" cy="200.053" r="39.672"></circle>
                        <circle style="fill: #eeb490" cx="357.722" cy="200.053" r="39.672"></circle>
                      </g>
                      <path style="fill: #9d90c5"
                        d="M463.513,508.609H45.097v-74.935c0-34.925,26.109-64.085,60.355-68.493l92.228-36.62h113.25 l92.228,36.62c34.585,4.069,60.355,33.568,60.355,68.493V508.609z">
                      </path>
                      <path style="fill: #8075af"
                        d="M178.013,348.567v33.568c0,42.723,34.924,78.665,77.648,77.987 c41.367-0.678,74.596-34.585,74.596-76.291v-35.264c0-12.207-9.833-22.04-22.04-22.04H199.714 C187.846,326.866,178.013,336.699,178.013,348.567z">
                      </path>
                      <path style="fill: #eeb490"
                        d="M202.087,300.419v55.608c0,28.821,23.396,52.217,52.217,52.217l0,0 c28.821,0,52.217-23.396,52.217-52.217v-55.608H202.087z">
                      </path>
                      <path style="fill: #faccb4"
                        d="M306.861,94.601H201.748c-24.752,0-44.758,20.005-44.758,44.758v100.705 c0,53.913,43.74,97.314,97.314,97.314l0,0c53.913,0,97.314-43.74,97.314-97.314V139.359 C351.619,114.607,331.613,94.601,306.861,94.601z">
                      </path>
                      <g>
                        <path style="fill: #56545f"
                          d="M351.619,52.895c0,0,74.935,9.833,0,151.226V146.14c0,0-5.425-41.706-30.856-44.079L351.619,52.895z ">
                        </path>
                        <path style="fill: #56545f"
                          d="M300.758,0h-92.906c-3.73,0-7.46,0.339-10.85,1.017l0,0c-140.376,0-40.011,210.225-40.011,210.225 c0-81.038,50.861-81.377,50.861-81.377h93.245c35.942,0,64.763-29.16,64.763-64.763l0,0C365.86,29.16,336.699,0,300.758,0z">
                        </path>
                      </g>
                    </g>
                  </svg>
                  <span class="font-medium ml-2">User</span>
                </router-link>
              </li>
              <li>
                <router-link to="/category" v-ripple
                  class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple">
                  <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                    stroke="#a969f7">
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                      <g id="Iconly/Curved/Category">
                        <g id="Category">
                          <path id="Stroke 1" fill-rule="evenodd" clip-rule="evenodd"
                            d="M21.0003 6.6738C21.0003 8.7024 19.3551 10.3476 17.3265 10.3476C15.2979 10.3476 13.6536 8.7024 13.6536 6.6738C13.6536 4.6452 15.2979 3 17.3265 3C19.3551 3 21.0003 4.6452 21.0003 6.6738Z"
                            stroke="#190a66" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                          <path id="Stroke 3" fill-rule="evenodd" clip-rule="evenodd"
                            d="M10.3467 6.6738C10.3467 8.7024 8.7024 10.3476 6.6729 10.3476C4.6452 10.3476 3 8.7024 3 6.6738C3 4.6452 4.6452 3 6.6729 3C8.7024 3 10.3467 4.6452 10.3467 6.6738Z"
                            stroke="#190a66" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                          <path id="Stroke 5" fill-rule="evenodd" clip-rule="evenodd"
                            d="M21.0003 17.2619C21.0003 19.2905 19.3551 20.9348 17.3265 20.9348C15.2979 20.9348 13.6536 19.2905 13.6536 17.2619C13.6536 15.2333 15.2979 13.5881 17.3265 13.5881C19.3551 13.5881 21.0003 15.2333 21.0003 17.2619Z"
                            stroke="#190a66" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                          <path id="Stroke 7" fill-rule="evenodd" clip-rule="evenodd"
                            d="M10.3467 17.2619C10.3467 19.2905 8.7024 20.9348 6.6729 20.9348C4.6452 20.9348 3 19.2905 3 17.2619C3 15.2333 4.6452 13.5881 6.6729 13.5881C8.7024 13.5881 10.3467 15.2333 10.3467 17.2619Z"
                            stroke="#190a66" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                        </g>
                      </g>
                    </g>
                  </svg>
                  <span class="font-medium ml-2">Category</span>
                </router-link>
              </li>
              <li>
                <router-link to="/question" v-ripple
                  class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple">
                  <svg height="24px" width="24px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" xml:space="preserve" fill="#5637a0"
                    stroke="#5637a0">
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                      <g>
                        <g id="question_x5F_mark">
                          <g>
                            <path style="fill: #40f78f"
                              d="M17.6,30c0,1.102-0.895,2-2,2s-2-0.898-2-2c0-1.109,0.895-2,2-2S17.6,28.891,17.6,30z">
                            </path>
                            <path style="fill: #40f78f"
                              d="M15.676,25.977c-1.336,0-2.59-0.523-3.535-1.469c-0.945-1.105-1.465-2.359-1.465-3.695 s0.52-2.59,1.465-3.371l6.688-6.688C19.584,9.996,20,8.992,20,7.926c0-1.07-0.416-2.074-1.172-2.828 c-1.559-1.559-4.096-1.562-5.654,0C12.416,5.852,12,6.855,12,7.926H8c0-2.137,0.834-4.148,2.348-5.66 c3.02-3.023,8.285-3.02,11.309,0.004C23.168,3.777,24,5.785,24,7.926c0,2.137-0.832,4.145-2.344,5.656l-6.688,6.523 c-0.389,0.391-0.389,1.023,0,1.414c0.391,0.391,1.023,0.391,1.414,0c0.254-0.258,0.293-0.555,0.293-0.711h4 c0,1.336-0.52,2.594-1.465,3.699C18.266,25.453,17.012,25.977,15.676,25.977L15.676,25.977z">
                            </path>
                          </g>
                        </g>
                      </g>
                    </g>
                  </svg>
                  <span class="font-medium ml-2">Question</span>
                </router-link>
              </li>
              <li>
                <router-link to="/survey" v-ripple
                  class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple">
                  <svg height="24px" width="24px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 392.575 392.575" xml:space="preserve"
                    fill="#000000">
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                      <path style="fill:#FFFFFF;"
                        d="M237.576,330.72h-38.529c-6.012,0-10.925-4.848-10.925-10.925V281.33 c0-2.844,1.164-5.624,3.168-7.758l75.636-75.636V32.829c0-6.012-4.848-10.925-10.925-10.925H84.558v51.782 c0,6.012-4.848,10.925-10.925,10.925H21.851v275.265c0,6.012,4.848,10.925,10.925,10.925h223.418 c6.012,0,10.925-4.848,10.925-10.925V305.96l-21.721,21.592C243.329,329.556,240.549,330.72,237.576,330.72z">
                      </path>
                      <path style="fill:#56ACE0;"
                        d="M73.568,84.611H44.671l-2.715,252.315c-0.065,6.012,4.784,10.99,10.731,11.055l179.782,2.004 c6.012,0.065,10.99-4.784,11.055-10.731l0.065-10.279c-1.745,1.228-3.943,1.875-6.077,1.875h-38.529 c-6.012,0-10.925-4.848-10.925-10.925v-38.529c0-2.844,1.164-5.624,3.168-7.758l53.527-53.527l1.875-164.267 c0.065-6.012-4.784-10.99-10.731-11.055L84.364,43.237V73.75C84.558,79.698,79.58,84.611,73.568,84.611z">
                      </path>
                      <g>
                        <path style="fill:#194F82;"
                          d="M211.846,83.641h-90.634c-6.012,0-10.925-4.848-10.925-10.925c0-6.012,4.848-10.925,10.925-10.925 h90.634c6.012,0,10.925,4.848,10.925,10.925C222.772,78.793,217.923,83.641,211.846,83.641z">
                        </path>
                        <path style="fill:#194F82;"
                          d="M211.846,145.379H76.929c-6.012,0-10.925-4.848-10.925-10.925s4.848-10.925,10.925-10.925h134.982 c6.012,0,10.925,4.848,10.925,10.925C222.772,140.53,217.923,145.379,211.846,145.379z">
                        </path>
                        <path style="fill:#194F82;"
                          d="M211.846,207.116H76.929c-6.012,0-10.925-4.848-10.925-10.925c0-6.077,4.848-10.925,10.925-10.925 h134.982c6.012,0,10.925,4.848,10.925,10.925C222.836,202.267,217.923,207.116,211.846,207.116z">
                        </path>
                        <path style="fill:#194F82;"
                          d="M152.76,268.983h-75.83c-6.012,0-10.925-4.848-10.925-10.925c0-6.012,4.848-10.925,10.925-10.925 h75.83c6.012,0,10.925,4.848,10.925,10.925C163.685,264.134,158.772,268.983,152.76,268.983z">
                        </path>
                        <path style="fill:#194F82;"
                          d="M152.76,330.72h-75.83c-6.012,0-10.925-4.848-10.925-10.925s4.848-10.925,10.925-10.925h75.83 c6.012,0,10.925,4.848,10.925,10.925S158.772,330.72,152.76,330.72z">
                        </path>
                        <path style="fill:#194F82;"
                          d="M384.453,149.968l-15.451-15.451c-11.895-10.731-26.958-10.667-38.529,0L288.84,176.15V32.829 c0-18.036-14.675-32.711-32.711-32.711H82.683c-8.727,0-17.002,3.426-23.208,9.568L9.568,59.593C3.362,65.799,0,73.944,0,82.671 v277.075c0,18.036,14.675,32.711,32.711,32.711h223.418c18.036,0,32.711-14.675,32.711-32.711V284.11l95.612-95.612 C395.572,176.991,394.99,160.183,384.453,149.968z M62.642,37.354V62.76H37.236L62.642,37.354z M267.055,359.811 c0,6.012-4.848,10.925-10.925,10.925H32.711c-6.012,0-10.925-4.848-10.925-10.925v-275.2h51.782 c6.012,0,10.925-4.848,10.925-10.925V21.904h171.636c6.012,0,10.925,4.848,10.925,10.925v165.107l-75.572,75.636 c-2.004,2.004-3.168,4.784-3.168,7.758v38.529c0,6.012,4.848,10.925,10.925,10.925h38.529c2.844,0,5.624-1.164,7.758-3.168 l21.657-21.657L267.055,359.811L267.055,359.811z M233.115,308.934h-23.079v-23.079l106.408-106.473l23.079,23.079L233.115,308.934 z M369.002,173.047l-13.964,13.964l-23.079-23.079l13.964-13.964c2.78-2.263,5.301-2.004,7.758,0l15.386,15.386 C371.006,166.776,371.394,171.108,369.002,173.047z">
                        </path>
                      </g>
                      <g>
                        <polygon style="fill:#FFC10D;" points="62.642,37.354 37.236,62.76 62.642,62.76 "></polygon>
                        <polygon style="fill:#FFC10D;"
                          points="210.036,285.791 210.036,308.934 233.115,308.934 339.588,202.526 316.444,179.383 ">
                        </polygon>
                      </g>
                      <path style="fill:#FFFFFF;"
                        d="M353.616,149.968c-2.392-2.004-4.978-2.263-7.758,0l-13.964,13.964l23.079,23.079l13.964-13.964 c2.392-1.939,2.004-6.271,0-7.758L353.616,149.968z">
                      </path>
                    </g>
                  </svg>
                  <span class="font-medium ml-2">Survey</span>
                </router-link>
              </li>
              <li>
                <router-link to="/feedback" v-ripple
                  class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple">
                  <svg width="24px" height="24px" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg"
                    mirror-in-rtl="true" fill="#000000">
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                      <path fill="#494c4e"
                        d="M4.1 2h-.2A2.906 2.906 0 0 0 1 4.9v1.2A2.906 2.906 0 0 0 3.9 9h.2A2.906 2.906 0 0 0 7 6.1V4.9A2.906 2.906 0 0 0 4.1 2zM4 10a4.012 4.012 0 0 0-4 4v2.667a1.326 1.326 0 0 0 1.333 1.324l5.333.01A1.337 1.337 0 0 0 8 16.667V14a4.01 4.01 0 0 0-4-4zM18 1v4a1 1 0 0 1-1 1h-3.99l-1.19 1.88a.47.47 0 0 1-.32.12.538.538 0 0 1-.21-.05.493.493 0 0 1-.29-.45V6h-1a1 1 0 0 1-1-1V1a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1z">
                      </path>
                    </g>
                  </svg>
                  <span class="font-medium ml-2">Feedback</span>
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </template>
    </Sidebar>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
defineProps({
  visible: Boolean
});
const emit = defineEmits(['sidebar:close']);
function closeSidebar() {
  emit('sidebar:close', true)
} 
</script>
