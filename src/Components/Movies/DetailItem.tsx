import React from "react";

const DetailItem = ({ icon: Icon, label, value }: { icon: any; label: string; value: string }) => (
  <div className="space-y-1">
    <span className="text-sm text-gray-500">{label}</span>
    <div className="flex items-center gap-2 text-gray-700">
      <Icon size={16} className="text-gray-400" />
      <span>{value}</span>
    </div>
  </div>
);

export default DetailItem;
