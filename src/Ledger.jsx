import React, { useState } from 'react';

const DynamicLedger = ({ data }) => {

    const accounts = {};
    data.forEach(entry => {
        if (!accounts[entry.account]) {
            accounts[entry.account] = [];
        }
        accounts[entry.account].push(entry);
    });

    return (
        <div className="container mx-auto">
            {Object.entries(accounts).map(([account, entries]) => {
                // Calculate the final balance
                let totalDebits = 0;
                let totalCredits = 0;
                entries.forEach((entry) => {
                    if (entry.debit) {
                        totalDebits += entry.debit;
                    }
                    if (entry.credit) {
                        totalCredits += entry.credit;
                    }
                });
                const finalBalance = totalDebits - totalCredits;

                return (
                    <div key={account} className="mb-8">
                        <h3 className="text-xl font-bold mb-4">{account}</h3>
                        <div className="flex mb-4">
                            <div className="w-1/2">
                                <h4 className="font-bold mb-2">Debits</h4>
                                <table className="w-full border border-gray-300">
                                    <tbody>
                                        {entries.map((entry, index) => (
                                            (entry.debit === '') ? (
                                                <tr key={index} className="border-b border-gray-300">
                                                    <td className="p-2">&nbsp;</td>
                                                    <td className="p-2">&nbsp;</td>
                                                </tr>
                                            ) : (
                                                <tr key={index} className="border-b border-gray-300">
                                                    <td className="p-2">{entry.date?.toString()}</td>
                                                    <td className="p-2">${entry.debit}</td>
                                                </tr>
                                            )
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="w-1/2">
                                <h4 className="font-bold mb-2">Credits</h4>
                                <table className="w-full border border-gray-300">
                                    <tbody>
                                        {entries.map((entry, index) => (
                                            (entry.credit === '') ? (
                                                <tr key={index} className="border-b border-gray-300">
                                                    <td className="p-2">&nbsp;</td>
                                                    <td className="p-2">&nbsp;</td>
                                                </tr>
                                            ) : (
                                                <tr key={index} className="border-b border-gray-300">
                                                    <td className="p-2">{entry.date?.toString()}</td>
                                                    <td className="p-2">${entry.credit}</td>
                                                </tr>
                                            )
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <div className="w-1/2">
                                <h4 className="font-bold mb-2">Final Balance</h4>
                                <table className="w-full border border-gray-300">
                                    <tbody>
                                        <tr>
                                            <td className={`p-2 ${finalBalance > 0 ? 'text-green-500' : 'text-red-500'}`}>
                                                {Math.abs(finalBalance)}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default DynamicLedger;