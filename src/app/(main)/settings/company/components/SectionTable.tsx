'use client';
import { RightOutlined } from '@ant-design/icons';
import DeleteButton from '@root/app/components/DeleteButton';
import DropdownStatus from '@root/app/components/DropdownStatus';
import EditButton from '@root/app/components/EditButton';
import TableComponent from '@root/app/components/Table';
import { useAppDispatch } from '@root/libs/store';
import { SectionType } from '@root/libs/store/slices/section.slice';
import { deleteSection, getSectionList, setSectionStatus } from '@root/libs/store/thunk/section';
import { useState } from 'react';
import TeamTable from './TeamTable';
import styles from './childtable.module.scss';
import AddButtonList from '@root/app/components/AddButtonList';
import DynamicModal from '@root/app/components/DynamicModal';
import FormTeam from './FormTeam';
import { getCompanies } from '@root/libs/store/thunk/company';
import { useRouter } from 'next/navigation';
import { capitalizeEachWord } from '@root/libs/utils';

interface SectionTableProps {
  department_id: string;
  sections: SectionType[];
}

const SectionTable: React.FC<SectionTableProps> = ({ department_id, sections }) => {
  const route = useRouter();
  const dispatch = useAppDispatch();
  const [expandedRowKeys, setExpandedRowKeys] = useState<React.Key[]>([]);
  const [showModalForm, setShowModalForm] = useState<boolean>(false);
  const [selectedData, setSelectedData] = useState<string>('');

  const handleExpandRow = (record: any) => {
    setExpandedRowKeys((prevKeys) => (prevKeys.includes(record.section.idSection) ? prevKeys.filter((key) => key !== record.section.idSection) : [record.section.idSection]));
  };

  const handleDelete = async (id: string) => {
    const result = await dispatch(deleteSection(id));
    if (result && result.success) {
      await dispatch(getCompanies());
      route.refresh();
    } else {
      console.error('Failed to delete section');
    }
  };

  const handleStatusChange = async (id: number, status: string) => {
    try {
      const capitalizedStatus = capitalizeEachWord(status);
      const result = await dispatch(setSectionStatus(id, capitalizedStatus as 'Aktif' | 'Tidak Aktif'));

      console.log(id, capitalizedStatus);

      if (result && result.success) {
        await dispatch(getCompanies());
        route.refresh();
      } else if (result && result.error) {
        console.error('Failed to update status:', result.error);
      }
    } catch (error) {
      console.error('Error occurred during status update:', error);
    }
  };

  const column = [
    {
      key: 'title',
      dataIndex: null,
      width: 150,
      render: () => {
        return <div className='border-l-[10px] border-[#9747FF] flex h-[100px] items-center rounded-[10px] justify-center'>Section</div>;
      },
    },
    {
      key: 'name',
      dataIndex: ['section', 'nameSection'],
      render: (text: string, record: any) => {
        return (
          <div className='flex pl-[50px] h-[100px] items-center cursor-pointer justify-between'>
            <div
              className='flex w-1/2 gap-5'
              onClick={async () => {
                handleExpandRow(record);
              }}
            >
              <div>
                <RightOutlined />
              </div>
              <div>{text}</div>
            </div>
          </div>
        );
      },
    },
    {
      key: 'status',
      dataIndex: ['section', 'status'],
      width: 170,
      render: (value: string, record: any) => {
        return (
          <div className='flex justify-center'>
            <DropdownStatus
              initialValue={value}
              id={record.section.idSection}
              statusOptions={[
                { value: 'Tidak Aktif', label: 'Tidak Aktif' },
                { value: 'Aktif', label: 'Aktif' },
              ]}
              onChangeStatus={handleStatusChange}
            />
          </div>
        );
      },
    },
    {
      key: 'action',
      width: 170,
      title: 'Action',
      dataIndex: null,
      render: (text: string, record: any) => {
        return (
          <div className='flex gap-2 justify-center'>
            <EditButton destinationPage={`/settings/section/edit/${record.section.idSection}`} />
            <AddButtonList
              title='Add Team'
              onClick={() => {
                setShowModalForm(true);
                setSelectedData(record.section.idSection);
              }}
            />
            {(!record.teams || record.teams?.length === 0) && <DeleteButton handleDelete={() => handleDelete(record.section.idSection)} />}
          </div>
        );
      },
    },
  ];

  return (
    <div className={`${styles['table-content-child']} pl-[50px]`}>
      <TableComponent
        rowKey={(record) => record.section.idSection}
        loading={false}
        columns={column}
        dataSource={sections}
        tableOnly={true}
        withExport={false}
        showHeader={false}
        withSearch={false}
        expandable={{
          indentSize: 15,
          expandIconColumnIndex: -1,
          expandedRowKeys: expandedRowKeys,
          onExpand: (expanded, record) => handleExpandRow(record),
          expandedRowRender: (record) => <TeamTable section_id={record.section.idSection} teams={record.teams} />,
        }}
      />
      <DynamicModal
        isVisible={showModalForm}
        title='Form Team'
        onHideModal={() => setShowModalForm(false)}
        footer={null}
        content={
          <FormTeam
            section_id={selectedData}
            callback={async () => {
              await dispatch(getCompanies());
              setShowModalForm(false);
            }}
          />
        }
      />
    </div>
  );
};

export default SectionTable;
