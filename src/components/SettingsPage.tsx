import React from 'react';
import moment from 'moment';
import { Button } from 'antd';

interface SettingsPageProps {
  sessionOpenAt: moment.Moment | null;
  accountingBalance: number;
  realBalance: number;
  onCloseSession: () => void;
}

const SettingsPage: React.FC<SettingsPageProps> = ({
  sessionOpenAt,
  accountingBalance,
  realBalance,
  onCloseSession,
}) => {
  const difference = accountingBalance - realBalance;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Session Settings</h2>
      <div className="mb-4">
        <p>Opened at: {sessionOpenAt ? sessionOpenAt.format('YYYY-MM-DD HH:mm:ss') : 'N/A'}</p>
        <p>Accounting Balance: ${accountingBalance.toFixed(2)}</p>
        <p>Real Balance: ${realBalance.toFixed(2)}</p>
        <p>Difference: ${difference.toFixed(2)}</p>
      </div>
      <Button type="primary" danger onClick={onCloseSession}>
        Close Session
      </Button>
    </div>
  );
};

export default SettingsPage;