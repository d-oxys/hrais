import { Avatar, Col, Progress, Row } from "antd";

const OverviewSection = () => {
  return (
    <div>
      <Row gutter={24}>
        <Col span={12}>
          <div
            className={`bg-white rounded-lg justify-center py-5 px-7 flex justify-between`}
          >
            <div>
              <div className="text-2xl font-bold">3 days</div>
              <div>Permissions Remaining</div>
              <div className="mt-3">
                Expire at <span className="text-danger">21 Dec 2024</span>
              </div>
            </div>
            <div></div>
          </div>

          <div
            className={`bg-white rounded-lg justify-center py-5 px-7 flex justify-between mt-4`}
          >
            <div>
              <div className="text-2xl font-bold">3/8</div>
              <div>Projects Done</div>
              <div className="mt-3">
                This year: <span className="text-danger">2024</span>
              </div>
            </div>
            <div></div>
          </div>
        </Col>
        <Col span={12}>
          <div
            className={`bg-white rounded-lg justify-center py-5 px-7 flex justify-between`}
          >
            <div className="w-full">
              <div className="text-2xl font-bold">3,000,000</div>
              <div>Claims Left</div>
              <div className="mt-3 flex w-full">
                <div className="font-bold w-1/2">History Date</div>
                <div className="font-bold w-1/2">Amount</div>
              </div>
              <div className="flex w-full">
                <div className="w-1/2">20 Jan 2024</div>
                <div className="w-1/2">-1,000,000</div>
              </div>
              <div className="flex w-full">
                <div className="w-1/2">20 Jan 2024</div>
                <div className="w-1/2">-1,000,000</div>
              </div>
              <div className="flex w-full">
                <div className="w-1/2">20 Jan 2024</div>
                <div className="w-1/2">-1,000,000</div>
              </div>
              <div className="mt-[60px]">
                Expire at: <span className="text-danger">31 Dec 2024</span>
              </div>
            </div>
            <div></div>
          </div>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col span={24}>
          <div className={`bg-white rounded-lg justify-center py-5 px-7`}>
            <Row>
              <Col span={24}>
                <div className="flex gap-2 w-full items-center">
                  <Avatar size="large" />
                  <div>
                    <p className="font-bold">Anthony Cristianto</p>
                    <p className="font-medium">Performance</p>
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Progress
                  percent={70}
                  className="w-full mt-4"
                  status="success"
                  showInfo={false}
                />
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
};
export default OverviewSection;
