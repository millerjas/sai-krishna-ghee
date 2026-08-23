import React from "react"

export default function NutritionalFacts() {
  return (
    <div className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-sm max-w-xl my-4">
      <div className="flex items-center justify-between border-b-4 border-[#1D2B9A] pb-3 mb-4">
        <div>
          <span className="text-[10px] font-black tracking-widest text-[#1D2B9A] uppercase bg-[#FFE500] px-2.5 py-0.5 rounded-full">
            100% PURE COW MILK GHEE
          </span>
          <h3 className="text-xl font-black text-[#1D2B9A] mt-1">Nutritional Information</h3>
        </div>
        <div className="text-right">
          <span className="text-xs text-neutral-500 font-medium block">Per 100g Serving</span>
          <span className="text-xs font-bold text-[#1D2B9A]">Energy: 897 kcal</span>
        </div>
      </div>

      <div className="divide-y divide-neutral-100 text-xs">
        <div className="py-2.5 flex justify-between items-center font-bold text-neutral-900 bg-neutral-50 px-2 rounded">
          <span>Milk Fat / Total Fat</span>
          <span className="text-[#1D2B9A]">99.7 g</span>
        </div>

        <div className="py-2 flex justify-between items-center pl-4 text-neutral-700">
          <span>• Saturated Fatty Acids</span>
          <span>65.0 g</span>
        </div>

        <div className="py-2 flex justify-between items-center pl-4 text-neutral-700">
          <span>• Monounsaturated Fatty Acids (MUFA)</span>
          <span>25.0 g</span>
        </div>

        <div className="py-2 flex justify-between items-center pl-4 text-neutral-700">
          <span>• Polyunsaturated Fatty Acids (PUFA)</span>
          <span>2.5 g</span>
        </div>

        <div className="py-2 flex justify-between items-center pl-4 text-neutral-700">
          <span>• Trans Fatty Acids</span>
          <span className="font-bold text-green-600">0.0 g (Nil)</span>
        </div>

        <div className="py-2.5 flex justify-between items-center font-semibold text-neutral-800">
          <span>Cholesterol</span>
          <span>190 mg</span>
        </div>

        <div className="py-2.5 flex justify-between items-center font-semibold text-neutral-800">
          <span>Vitamin A</span>
          <span className="text-[#1D2B9A] font-bold">3000 IU / mcg</span>
        </div>

        <div className="py-2.5 flex justify-between items-center font-semibold text-neutral-800">
          <span>Vitamin E, D & K</span>
          <span className="text-green-700 font-bold">Naturally Present</span>
        </div>

        <div className="py-2.5 flex justify-between items-center font-bold text-neutral-900 bg-neutral-50 px-2 rounded">
          <span>Carbohydrate / Protein / Sugar</span>
          <span className="text-green-600">0.0 g (Nil)</span>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-[11px] text-neutral-500">
        <span>* % Daily values based on 2000 kcal diet</span>
        <span className="font-bold text-[#1D2B9A]">FSSAI License Certified</span>
      </div>
    </div>
  )
}
