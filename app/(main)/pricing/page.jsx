'use client';
import PricingModel from '@/components/custom/PricingModel';
import { UserDetailContext } from '@/context/UserDetailContext';
import Lookup from '@/data/Lookup';
import React, { useContext } from 'react';

function Pricing() {
  const { userDetail } = useContext(UserDetailContext);

  return (
    <div className="mt-24 px-4 sm:px-10 md:px-20 lg:px-32 max-w-7xl mx-auto">
      <h2 className="text-4xl md:text-5xl font-extrabold text-center">Our Pricing</h2>
      <p className="text-gray-500 text-center mt-4 max-w-2xl mx-auto">
        {Lookup.PRICING_DESC}
      </p>

      {userDetail && (
        <div className="mt-10 p-6 border border-gray-200 rounded-xl flex flex-col md:flex-row justify-between items-center bg-white shadow-sm">
          <h2 className="text-lg font-medium text-gray-700">
            <span className="text-indigo-600 font-semibold text-xl">{userDetail.token}</span> Tokens Left
          </h2>
          <div className="text-center md:text-right mt-4 md:mt-0">
            <h3 className="text-md font-semibold text-gray-700">Need more tokens?</h3>
            <p className="text-sm text-gray-500">Upgrade your plan below</p>
          </div>
        </div>
      )}

      <PricingModel />
    </div>
  );
}

export default Pricing;
