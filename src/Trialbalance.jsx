import React from 'react';
import { Table } from 'antd';

const DynamicTrialBalance = ({ data }) => {
    // Group the data by account
    const accounts = {};
    data.forEach((entry) => {
        console.log(entry);
        if (!accounts[entry.account]) {
            accounts[entry.account] = {
                debit: 0,
                credit: 0,
            };
        }
        if (entry.debit) {
            accounts[entry.account].debit += entry.debit;
        }
        if (entry.credit) {
            accounts[entry.account].credit += entry.credit;
        }
    });

    // Prepare the data for the table
    const tableData = Object.entries(accounts).map(([account, balances]) => ({
        account,
        debit: balances.debit,
        credit: balances.credit,
    }));

    // Calculate the total balances
    const totalDebits = tableData.reduce((sum, entry) => sum + entry.debit, 0);
    const totalCredits = tableData.reduce((sum, entry) => sum + entry.credit, 0);

    // Determine if the totals are balanced
    const isBalanced = totalDebits === totalCredits;

    // Add the total balances row
    tableData.push({
        account: 'Total',
        debit: totalDebits,
        credit: totalCredits,
    });

    return (
        <div>
            <Table
                dataSource={tableData}
                columns={[
                    {
                        title: 'Account',
                        dataIndex: 'account',
                        key: 'account',
                        className: 'font-bold',
                    },
                    {
                        title: 'Debit $',
                        dataIndex: 'debit',
                        key: 'debit',
                    },
                    {
                        title: 'Credit $',
                        dataIndex: 'credit',
                        key: 'credit',
                    },
                ]}
                pagination={false}
                rowClassName={(record, index) =>
                    index === tableData.length - 1 ? 'total-row' : ''
                }
            />
            <style jsx>{`
        .total-row {
          background-color: #f5f5f5;
          color: ${isBalanced ? 'inherit' : 'red'};
        }
      `}</style>
        </div>
    );
};

export default DynamicTrialBalance;