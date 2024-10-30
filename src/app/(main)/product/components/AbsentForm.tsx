import { useAppDispatch, useAppSelector } from '@root/libs/store';
import { Checkbox, Row, Col, Input } from 'antd';
import { useEffect, useState } from 'react';
import styles from './component.module.scss';
import { getSiteData } from '@root/libs/store/thunk/rasite';
import { setSelectedSites } from '@root/libs/store/slices/selectedSitesSlice';
import _ from 'lodash';

const AbsentForm = () => {
  const dispatch = useAppDispatch();
  const [selectedChannels, setSelectedChannels] = useState<string[]>([]);
  const [selectedSites, setSelectedSitesState] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const { sitedata } = useAppSelector((state) => state.rasiteGroup);

  // const channelOptions = ['ENABLER', 'KONSI', 'STORE', 'WHOLESALE', 'B2B', 'ONLINEHQ'];
  const channelOptions = [ 'OS', 'ONLINEHQ'];

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
    .filter((site) => site.name.toLowerCase().includes(searchTerm.toLowerCase()));


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
    const prefixesToRemove = ['ST', 'EG', 'BP', 'EX', 'SH'];
    const parts = name.split(' ');
    const cleanedName = parts.filter((part) => !prefixesToRemove.includes(part)).join(' ');
    return cleanedName.trim();
  };

  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-row md:flex-col gap-4 w-full">
        {/* Channels Section */}
        <div className="mt-4 rounded-xl p-4 w-full md:w-3/4 bg-white shadow-sm">
          <div className="font-bold text-lg mb-4">Channels</div>
          <div className={styles['permission-tab']}>
            <Checkbox.Group onChange={handleChannelChange} value={selectedChannels}>
              <Row gutter={[0, 8]} className="w-full">
                {channelOptions.map((option) => (
                  <Col span={24} key={option} className="w-full">
                    <div 
                      className={`
                        transition-colors duration-200 ease-in-out
                        ${selectedChannels.includes(option) ? 'bg-blue-100' : 'hover:bg-gray-50'} 
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
          </div>
        </div>

        {/* Sites Section */}
        <div className="mt-4 bg-white rounded-xl p-4 w-full md:w-3/4 shadow-sm">
          <div className="flex flex-col space-y-4">
            <h3 className="font-bold text-lg">Filtered Sites:</h3>
            <Input 
              placeholder="Search sites..." 
              onChange={handleSearchInputChange}
              className="w-full mb-4"
            />
            
            {filteredSites.length > 0 ? (
              <Checkbox.Group onChange={handleSiteChange} value={selectedSites} className="w-full">
                <Row gutter={[16, 16]} className="w-full">
                  {filteredSites.map((site) => (
                    <Col xs={24} sm={24} md={12} key={site.site} className="w-full">
                      <div className="hover:bg-gray-50 p-2 rounded transition-colors duration-200">
                        <Checkbox value={site.site} className="w-full">
                          <span className="ml-2 break-words">
                            {site.site} - {cleanSiteName(site.name)}
                          </span>
                        </Checkbox>
                      </div>
                    </Col>
                  ))}
                </Row>
              </Checkbox.Group>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No sites available for the selected channels.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AbsentForm;