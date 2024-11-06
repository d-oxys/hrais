"use client";
import { useAppDispatch, useAppSelector } from "@root/libs/store";
import { Checkbox, Row, Col, Input, Skeleton } from "antd";
import { useEffect, useState } from "react";
import styles from "./component.module.scss";
import { getSiteData } from "@root/libs/store/thunk/rasite";
import { setSelectedSites } from "@root/libs/store/slices/selectedSitesSlice";
import _ from "lodash";

const AbsentForm = () => {
  const dispatch = useAppDispatch();
  const [selectedChannels, setSelectedChannels] = useState<string[]>([]);
  const [selectedSitesState, setSelectedSitesState] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { sitedata, loading } = useAppSelector((state) => state.rasiteGroup);
  const selectedSites = useAppSelector((state) => state.selectedSites.sites);
  const [subChannels, setSubChannels] = useState<any[]>([]);

  const channelOptions = ["OS", "ECOMM"];

  useEffect(() => {
    dispatch(getSiteData());
  }, [dispatch]);

  useEffect(() => {
    if (selectedSites.length > 0) {
      setSelectedSitesState(selectedSites);
    }
  }, [selectedSites]);

  const handleChannelChange = (checkedValues: string[]) => {
    setSelectedChannels(checkedValues);
    setSelectedSitesState([]);
    dispatch(setSelectedSites([]));

    const newSubChannels = checkedValues.flatMap((channel) => {
      const channelData = sitedata.find((site) => site.kode === channel);
      return channelData ? channelData.subChannel : [];
    });

    setSubChannels(newSubChannels);
  };

  const filteredSites = sitedata
    .filter((site) => selectedChannels.includes(site.kode))
    .filter((site) =>
      site.nama.toLowerCase().includes(searchTerm.toLowerCase())
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

  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-row md:flex-col gap-4 w-full">
        {/* Channels Section */}
        <div className="mt-4 rounded-xl p-4 w-full md:w-3/4 bg-white shadow-sm">
          <div className="font-bold text-lg mb-4">Channels</div>
          {loading ? (
            <Skeleton active paragraph={{ rows: 2 }} />
          ) : (
            <Checkbox.Group
              onChange={handleChannelChange}
              value={selectedChannels}
            >
              <Row gutter={[0, 8]} className="w-full">
                {channelOptions.map((option) => (
                  <Col span={24} key={option} className="w-full">
                    <div
                      className={`transition-colors duration-200 ease-in-out
                        ${selectedChannels.includes(option) ? "bg-blue-100" : "hover:bg-gray-50"} 
                        p-2 rounded w-full
                      `}
                    >
                      <Checkbox value={option} className="w-full">
                        <span className="ml-2">{option}</span>
                      </Checkbox>
                    </div>
                  </Col>
                ))}
              </Row>
            </Checkbox.Group>
          )}
        </div>

        {/* Sub Channels Section */}
        <div className="mt-4 bg-white rounded-xl p-4 w-full md:w-3/4 shadow-sm">
          <div className="font-bold text-lg mb-4">Sub Channels:</div>
          <Input
            placeholder="Search sites..."
            onChange={handleSearchInputChange}
            className="w-full mb-4"
          />
          {loading ? (
            <Skeleton active paragraph={{ rows: 4 }} />
          ) : (
            subChannels.length > 0 && (
              <Checkbox.Group
                onChange={handleSiteChange}
                value={selectedSitesState}
                className="w-full"
              >
                <Row gutter={[16, 16]} className="w-full">
                  {subChannels.map((sub) => (
                    <Col
                      xs={24}
                      sm={24}
                      md={12}
                      key={sub.kdToko}
                      className="w-full"
                    >
                      <div className="hover:bg-gray-50 p-2 rounded transition-colors duration-200">
                        <Checkbox value={sub.kdToko} className="w-full">
                          <span className="ml-2">
                            {sub.kdToko} - {sub.nmToko}
                          </span>
                        </Checkbox>
                      </div>
                    </Col>
                  ))}
                </Row>
              </Checkbox.Group>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default AbsentForm;
