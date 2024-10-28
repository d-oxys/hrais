import { useAppDispatch, useAppSelector } from "@root/libs/store";
import { Checkbox, Row, Col, Input } from "antd";
import { useEffect, useState } from "react";
import styles from "./component.module.scss";
import { useSession } from "next-auth/react";
import { getSiteData } from "@root/libs/store/thunk/rasite";
import { setSelectedSites } from "@root/libs/store/slices/selectedSitesSlice";
import _ from "lodash";

const AbsentForm = () => {
  const dispatch = useAppDispatch();
  const [selectedChannels, setSelectedChannels] = useState<string[]>([]);
  const [selectedSites, setSelectedSitesState] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { sitedata } = useAppSelector((state) => state.rasiteGroup);

  const channelOptions = [
    "ENABLER",
    "KONSI",
    "STORE",
    "WHOLESALE",
    "B2B",
    "ONLINE HO",
  ];

  useEffect(() => {
    dispatch(getSiteData());
  }, [dispatch]);

  const handleChannelChange = (checkedValues: string[]) => {
    setSelectedChannels(checkedValues);
    setSelectedSitesState([]);
    dispatch(setSelectedSites([]));
  };

  const filteredSites = sitedata
    .filter((site) => selectedChannels.includes(site.category))
    .filter((site) =>
      site.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const handleSiteChange = (checkedValues: string[]) => {
    setSelectedSitesState(checkedValues);
    dispatch(setSelectedSites(checkedValues));
  };

  const debouncedSearch = _.debounce((value: string) => {
    setSearchTerm(value);
  }, 300);

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };

  const cleanSiteName = (name: string) => {
    const prefixesToRemove = ["ST", "EG", "BP", "EX", "SH"];
    const parts = name.split(" ");
    const cleanedName = parts
      .filter((part) => !prefixesToRemove.includes(part))
      .join(" ");
    return cleanedName.trim();
  };

  return (
    <div>
      <div className="flex gap-4 w-full">
        <div className={`mt-4 rounded-xl p-7 w-1/4 bg-white`}>
          <div className="font-bold text-lg">Channels</div>
          <div className={styles["permission-tab"]}>
            <Checkbox.Group
              onChange={handleChannelChange}
              value={selectedChannels}
            >
              <Row gutter={[0, 8]}>
                {channelOptions.map((option) => (
                  <Col span={24} key={option}>
                    <div
                      className={`${selectedChannels.includes(option) ? "bg-blue-100" : ""} p-2 rounded`}
                      style={{ width: "100%" }}
                    >
                      <Checkbox value={option} style={{ width: "100%" }}>
                        {option}
                      </Checkbox>
                    </div>
                  </Col>
                ))}
              </Row>
            </Checkbox.Group>
          </div>
        </div>
        <div className="mt-4 bg-white rounded-xl p-7 w-3/4">
          <h3 className="font-bold text-lg">Filtered Sites:</h3>
          <Input
            placeholder="Search sites..."
            onChange={handleSearchInputChange}
            style={{ marginBottom: "16px" }}
          />
          {filteredSites.length > 0 ? (
            <Checkbox.Group onChange={handleSiteChange} value={selectedSites}>
              <Row gutter={[16, 16]}>
                {filteredSites.map((site) => (
                  <Col span={12} key={site.site}>
                    <Checkbox value={site.site}>
                      {site.site} - {cleanSiteName(site.name)}
                    </Checkbox>
                  </Col>
                ))}
              </Row>
            </Checkbox.Group>
          ) : (
            <p>No sites available for the selected channels.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AbsentForm;
