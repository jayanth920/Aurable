import Lookup from '@/data/Lookup';
import React, { useContext, useState } from 'react';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { UserDetailContext } from '@/context/UserDetailContext';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';

function PricingModel() {
  const { userDetail } = useContext(UserDetailContext);
  const [selectedOption, setSelectedOption] = useState(null);

  const UpdateToken = useMutation(api.users.UpdateToken);

  const onPaymentSuccess = async (pricing, user) => {
    const token = Number(user?.token) + Number(pricing?.value);
    await UpdateToken({
      token,
      userId: user?._id,
    });
  };

  return (
    <div className="mt-14 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Lookup.PRICING_OPTIONS.map((pricing, index) => (
        <div
          key={index}
          className={`flex flex-col justify-between p-8 border rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 bg-white ${
            pricing.popular ? 'border-indigo-600 ring-2 ring-indigo-300' : ''
          }`}
        >
          {pricing.popular && (
            <span className="text-xs bg-indigo-100 text-indigo-700 font-semibold px-2 py-1 rounded-full self-start mb-4">
              Most Popular
            </span>
          )}
          <div>
            <h3 className="text-2xl font-bold text-gray-800">{pricing.name}</h3>
            <p className="mt-2 text-gray-500">{pricing.desc}</p>
            <div className="mt-4 text-sm text-gray-600">{pricing.tokens} Tokens</div>
          </div>

          <div className="mt-6">
            <h4 className="text-3xl font-bold text-center text-indigo-600">${pricing.price}</h4>
            {userDetail && (
              <div
                onClick={() => setSelectedOption(pricing)}
                className="mt-4"
              >
                <PayPalButtons
                  style={{ layout: 'horizontal' }}
                  onCancel={() => console.log('Payment cancelled')}
                  onClick={() => setSelectedOption(pricing)}
                  onApprove={() => onPaymentSuccess(pricing, userDetail)}
                  createOrder={(data, actions) =>
                    actions.order.create({
                      purchase_units: [
                        {
                          amount: {
                            value: pricing.price,
                            currency_code: 'USD',
                          },
                        },
                      ],
                    })
                  }
                />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default PricingModel;
