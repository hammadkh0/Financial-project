import { useState, useEffect } from 'react';
import { Table, Input, Button, DatePicker, InputNumber, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { message } from 'antd';
import './DynamicTable.css';
const { Option, OptGroup } = Select;

const DynamicTable = (props) => {
    const [data, setData] = useState([
        {
            date: null,
            account: '',
            description: '',
            debit: null,
            credit: null,
            disableDebit: false,
            disableCredit: false,
        },
    ]);

    const addRow = () => {
        const newRow = {
            date: null,
            account: '',
            description: '',
            debit: null,
            credit: null,
            disableDebit: false,
            disableCredit: false,
        };

        setData([...data, newRow]);
    };

    const handleDateChange = (value, index) => {
        const updatedData = [...data];
        updatedData[index].date = value;
        setData(updatedData);
    };

    const handleInputChange = (value, index, fieldName) => {
        const newData = [...data];
        newData[index][fieldName] = value;

        if (fieldName === 'debit') {
            if (value) {
                newData[index].credit = ''; // Clear the credit field if debit has a value
                newData[index].disableCredit = true; // Disable the credit input
            } else {
                newData[index].disableCredit = false; // Enable the credit input if debit is cleared
            }
        } else if (fieldName === 'credit') {
            if (value) {
                newData[index].debit = ''; // Clear the debit field if credit has a value
                newData[index].disableDebit = true; // Disable the debit input
            } else {
                newData[index].disableDebit = false; // Enable the debit input if credit is cleared
            }
        }

        setData(newData);
    };

    const logTableData = () => {
        // Validation checks
        const errors = [];
      
        // Check for missing values and total debit/credit equality
        data.forEach((row, index) => {
          if (!row.date || !row.account || (!row.debit && !row.credit)) {
            errors.push(`Missing values in row ${index + 1}`);
          }
        });
      
        const totalDebit = data.reduce((total, row) => total + (row.debit || 0), 0);
        const totalCredit = data.reduce((total, row) => total + (row.credit || 0), 0);
      
        if (totalDebit !== totalCredit) {
          errors.push('Total debit is not equal to total credit');
        }
      
        // Display error messages
        if (errors.length > 0) {
          errors.forEach((error) => {
            message.error(error);
          });
          return;
        }
      
        // If no errors, proceed with data handling
        console.log(JSON.stringify(data));
      
        props.data(data);
    };
       
    const handleRemoveRow = (index) => {
        const newData = [...data];
        newData.splice(index, 1);
        setData(newData);
    };

    const columns = [
        {
            title: 'Date',
            dataIndex: 'date',
            render: (text, record, index) => (
                <DatePicker
                    value={text}
                    onChange={(value) => handleDateChange(value, index)}
                />
            ),
        },
        {
            title: 'Account',
            dataIndex: 'account',
            render: (text, record, index) => (
                <Select
                    style={{ width: 200 }}
                    onChange={(value) => handleInputChange(value, index, 'account')}
                >
                    <OptGroup label="Assets">
                        {props.assets?.map((item) => (
                            <Option key={item} value={item}>
                                {item}
                            </Option>
                        ))}
                    </OptGroup>
                    <OptGroup label="Liabilities">
                        {props.liabilities?.map((item) => (
                            <Option key={item} value={item}>
                                {item}
                            </Option>
                        ))}
                    </OptGroup>
                    <OptGroup label="Owner's Equity">
                        {props.ownersEquity?.map((item) => (
                            <Option key={item} value={item}>
                                {item}
                            </Option>
                        ))}
                    </OptGroup>
                </Select>
            ),
        },
        {
            title: 'Description',
            dataIndex: 'description',
            render: (text, record, index) => (
                <Input.TextArea
                    value={text}
                    onChange={(e) => handleInputChange(e.target.value, index, 'description')}
                    maxRows={2}
                />
            ),
        },
        {
            title: 'Debit',
            dataIndex: 'debit',
            render: (text, record, index) => (
                <InputNumber
                    disabled={record.disableDebit}
                    value={record.debit}
                    onChange={(value) => handleInputChange(value, index, 'debit')}
                    prefix="$"
                    parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                    type="number"
                />
            ),
        },
        {
            title: 'Credit',
            dataIndex: 'credit',
            render: (text, record, index) => (
                <InputNumber
                    disabled={record.disableCredit}
                    value={record.credit}
                    onChange={(value) => handleInputChange(value, index, 'credit')}
                    prefix="$"
                    parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                    type="number"
                />
            ),
        },
        {
            title: 'Actions',
            render: (_, record, index) => (
                <Button danger onClick={() => handleRemoveRow(index)}>
                    Remove
                </Button>
            ),
        },
    ];

    return (
        <div>
            <Table dataSource={data} columns={columns} pagination={false} />

            {/* <button className="btn btn-neutral" onClick={addRow}>Add Row</button>
            <button className="btn btn-neutral" onClick={logTableData}>Log Table Data</button> */}
            <div className="buttons">
                <Button className="add-row-btn" icon={<PlusOutlined />} onClick={addRow}>
                    Add Row
                </Button>
                <Button className="generate-btn"  onClick={logTableData}>
                    Generate Ledger and Trial Balance
                </Button>
            </div>
        </div>
    );
};

export default DynamicTable;
