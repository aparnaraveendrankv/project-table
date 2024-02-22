import React, { useState } from "react";
import { Img, Input, List, SelectBox, Text } from "components";
import InterviewData from "./InterviewData.json";
import "./styles.css";
import { CloseSVG } from "../../assets/images";
import * as XLSX from "xlsx";

const statusOptionsList = [
  { label: "In Transit", value: "In Transit" },
  { label: "Out for Delivery", value: "Out for Delivery" },
  { label: "Placed", value: "Placed" },
];

const distributionOptionsList = [
  { label: "Bangalore", value: "Bangalore" },
  { label: "Hyderabad", value: "Hyderabad" },
  { label: "Patna", value: "Patna" },
];

const InterviewtemplatePage = () => {
  const [groupsevenvalue, setGroupsevenvalue] = useState("");
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedDistribution, setSelectedDistribution] = useState("");

  const handleCheckboxChange = (orderId) => {
    const index = selectedOrders.indexOf(orderId);
    if (index === -1) {
      setSelectedOrders([...selectedOrders, orderId]);
    } else {
      setSelectedOrders(selectedOrders.filter((id) => id !== orderId));
    }
  };

  const handleMasterCheckboxChange = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      const allOrderIds = InterviewData.orders.map((order) => order.id);
      setSelectedOrders(allOrderIds);
    } else {
      setSelectedOrders([]);
    }
  };

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
  };

  const handleDistributionChange = (distribution) => {
    setSelectedDistribution(distribution);
  };

  const exportToExcel = () => {
    const selectedOrdersData = InterviewData.orders.filter((order) =>
      selectedOrders.includes(order.id)
    );

    const worksheet = XLSX.utils.json_to_sheet(selectedOrdersData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Selected Orders");
    XLSX.writeFile(workbook, "selected_orders.xlsx");
  };

  // Filtering the orders based on selected status and distribution
  const filteredOrders = InterviewData.orders.filter((order) => {
    if (selectedStatus === "" || selectedStatus === order.status) {
      if (
        selectedDistribution === "" ||
        selectedDistribution === order.distribution
      ) {
        return true;
      }
    }
    return false;
  });

  return (
    <>
      <div className="bg-gray-100 flex flex-col font-poppins items-center justify-end mx-auto pt-[21px] w-full">
        <div className="flex flex-col gap-[19px] items-center justify-start w-full">
          <div className="flex sm:flex-col flex-row sm:gap-5 items-center justify-start max-w-[1305px] mx-auto md:px-5 w-full">
            {/* Search Input */}
            <Input
              name="groupSeven"
              placeholder="Search . . ."
              value={groupsevenvalue}
              onChange={(e) => setGroupsevenvalue(e)}
              className="!placeholder:text-gray-500 !text-gray-500 leading-[normal] p-0 text-base text-left w-full"
              wrapClassName="border-2 border-gray-300 border-solid flex sm:flex-1 rounded-[10px] w-[29%] sm:w-full"
              prefix={
                <Img
                  className="mt-px mb-0.5 cursor-pointer h-5 mr-4"
                  src="images/img_search.svg"
                  alt="search"
                />
              }
              suffix={
                <CloseSVG
                  fillColor="#9c9c9c"
                  className="cursor-pointer h-5 my-auto"
                  onClick={() => setGroupsevenvalue("")}
                  style={{
                    visibility:
                      groupsevenvalue?.length <= 0 ? "hidden" : "visible",
                  }}
                  height={20}
                  width={20}
                  viewBox="0 0 20 20"
                />
              }
              color="white_A700"
            />
            {/* Status Select Box */}
            <SelectBox
              className="border-2 border-gray-300 border-solid sm:flex-1 leading-[normal] ml-4 sm:ml-[0] text-base text-left w-1/5 sm:w-full"
              placeholderClassName="text-gray-500"
              indicator={
                <Img
                  className="h-[30px] mr-[0] w-[30px]"
                  src="images/img_arrowdown.svg"
                  alt="arrow_down"
                />
              }
              isSearchable={false}
              placeholder="Status"
              getOptionLabel={(e) => (
                <div className="flex items-center">
                  <Img
                    className="h-5 mr-4 w-5"
                    src="images/img_ciltag.svg"
                    alt="cil:tag"
                  />
                  <span>{e.label}</span>
                </div>
              )}
              name="groupSix"
              isMulti={false}
              options={statusOptionsList}
              shape="round"
              color="white_A700"
              size="xs"
              variant="fill"
              onChange={handleStatusChange}
            />
            {/* Distribution Select Box */}
            <SelectBox
              className="border-2 border-gray-300 border-solid sm:flex-1 leading-[normal] ml-4 sm:ml-[0] text-base text-left w-1/5 sm:w-full"
              placeholderClassName="text-gray-500"
              indicator={
                <Img
                  className="h-[30px] mr-[0] w-[30px]"
                  src="images/img_arrowdown.svg"
                  alt="arrow_down"
                />
              }
              isSearchable={false}
              placeholder="Distribution"
              getOptionLabel={(e) => (
                <div className="flex items-center">
                  <Img
                    className="h-5 mr-4 w-5"
                    src="images/img_carbonlocation.svg"
                    alt="carbon:location"
                  />
                  <span>{e.label}</span>
                </div>
              )}
              name="groupFour"
              isMulti={false}
              options={distributionOptionsList}
              shape="round"
              color="white_A700"
              size="xs"
              variant="fill"
              onChange={handleDistributionChange}
            />
            {/* Export Input */}
            <Input
              name="groupFive"
              placeholder="Export orders"
              className="leading-[normal] p-0 placeholder:text-white-A700 text-left text-lg w-full"
              wrapClassName="flex sm:flex-1 sm:ml-[0] ml-[175px] w-[17%] sm:w-full"
              prefix={
                <Img
                  onClick={exportToExcel}
                  className="mt-px mb-1.5 h-5 mr-4"
                  src="images/img_download.svg"
                  alt="download"
                />
              }
              shape="round"
            />
          </div>
          <div className="bg-white-A700 flex flex-col items-center justify-start p-[27px] sm:px-5 w-full">
            <div className="flex flex-col gap-[18px] justify-start max-w-[1305px] mb-[15px] mt-[5px] mx-auto md:px-5 w-full">
              {/* Orders Header */}
              <div className="flex flex-row items-center justify-start ml-3.5 md:ml-[0] w-[26%] md:w-full">
                {/* Master checkbox */}
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleMasterCheckboxChange}
                  className="h-5 w-5 cursor-pointer mr-2 rounded-md"
                />
                <Text
                  className="ml-[25px] text-black-900 text-lg"
                  size="txtPoppinsMedium18"
                >
                  ALL ORDERS
                </Text>
                <Text
                  className="ml-3.5 mt-2 text-gray-500"
                  size="txtPoppinsRegular16"
                >
                  ({selectedOrders.length} Orders Selected)
                </Text>
              </div>
              <List
                className="flex flex-col gap-[17px] items-center w-full"
                orientation="vertical"
              >
                <div className="bg-gray-100 flex flex-1 flex-row items-center justify-start p-3.5 rounded-[10px] w-full">
                  <div className="flex md:flex-col flex-row md:gap-5 items-start justify-start my-1 w-[98%]">
                    <input
                      type="checkbox"
                      checked={selectAll}
                      onChange={handleMasterCheckboxChange}
                      className="h-5 w-5 cursor-pointer mr-2 rounded-md"
                    />
                    <Text
                      className="md:ml-[0] ml-[25px] text-base text-gray-500"
                      size="txtPoppinsRegular16"
                    >
                      Ref. ID
                    </Text>
                    <Text
                      className="md:ml-[0] ml-[60px] text-base text-gray-500"
                      size="txtPoppinsRegular16"
                    >
                      Customer
                    </Text>
                    <Text
                      className="md:ml-[0] ml-[106px] text-base text-gray-500"
                      size="txtPoppinsRegular16"
                    >
                      Products
                    </Text>
                    <Text
                      className="ml-48 md:ml-[0] text-base text-gray-500"
                      size="txtPoppinsRegular16"
                    >
                      Date
                    </Text>
                    <Text
                      className="ml-32 md:ml-[0] text-base text-gray-500"
                      size="txtPoppinsRegular16"
                    >
                      Distribution
                    </Text>
                    <Text
                      className="md:ml-[0] ml-[94px] text-base text-gray-500"
                      size="txtPoppinsRegular16"
                    >
                      Status
                    </Text>
                    <Text
                      className="md:ml-[0] ml-[141px] text-base text-gray-500"
                      size="txtPoppinsRegular16"
                    >
                      Price (in Rs.)
                    </Text>
                  </div>
                </div>

                {/* Orders List */}
                {filteredOrders.map((order) => (
                  <div
                    key={order.id}
                    className={`bg-gray-100 flex flex-1 flex-row items-center justify-start p-3.5 rounded-[10px] w-full  text-gray-500 ${
                      selectedOrders.includes(order.id)
                        ? "checkbox-checked"
                        : ""
                    }`}
                  >
                    <div onClick={() => handleCheckboxChange(order.id)}>
                      <Img
                        className="h-5 w-5 cursor-pointer"
                        src={
                          selectedOrders.includes(order.id)
                            ? "https://t3.ftcdn.net/jpg/03/64/95/96/360_F_364959665_hmWMLBJncUasP7gX9bnMfShe6w4lPRcx.jpg"
                            : "images/img_unchecked6.svg"
                        }
                        alt={
                          selectedOrders.includes(order.id)
                            ? "checked"
                            : "unchecked"
                        }
                      />
                    </div>
                    <label htmlFor={`order${order.id}`}>
                      <div className="flex md:flex-col flex-row md:gap-5 items-start justify-start my-1 w-[98%]">
                        <Text
                          className="md:ml-[0] ml-[25px] text-base"
                          size="txtPoppinsRegular16"
                        >
                          {order.id}
                        </Text>
                        <Text
                          className="md:ml-[0] ml-[60px] text-base"
                          size="txtPoppinsRegular16"
                        >
                          {order.customer}
                        </Text>
                        <Text
                          className="md:ml-[0] ml-[106px] text-base"
                          size="txtPoppinsRegular16"
                        >
                          {order.products}
                        </Text>
                        <Text
                          className="ml-48 md:ml-[0] text-base"
                          size="txtPoppinsRegular16"
                        >
                          {order.date}
                        </Text>
                        <Text
                          className="ml-32 md:ml-[0] text-base"
                          size="txtPoppinsRegular16"
                        >
                          {order.distribution}
                        </Text>
                        <Text
                          className="md:ml-[0] ml-[94px] text-base"
                          size="txtPoppinsRegular16"
                        >
                          {order.status}
                        </Text>
                        <Text
                          className="md:ml-[0] ml-[141px] text-base"
                          size="txtPoppinsRegular16"
                        >
                          {order.price}
                        </Text>
                      </div>
                    </label>
                  </div>
                ))}
              </List>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InterviewtemplatePage;
