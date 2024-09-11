"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"

export function CopyGenerationPage() {
  const [selectedService, setSelectedService] = useState("head")

  const handleGenerateCopy = () => {
    console.log("Generating copy for:", selectedService)
    // Here you would typically call an API or perform some action
  }

  return (
    <div className="container mx-auto p-4 font-sans max-w-3xl bg-white">
      <h2 className="text-3xl font-bold text-blue-500 mb-8 pb-2 border-b-2 border-blue-500">카피 생성</h2>
      
      <div className="space-y-8">
        <div>
          <h3 className="text-xl font-semibold mb-3 text-black">제품 / 브랜드</h3>
          <Input placeholder="버팔로 트레이스 위스키" className="w-full text-black" />
        </div>
        
        <div>
          <h3 className="text-xl font-semibold mb-3 text-black">서비스 선택</h3>
          <RadioGroup
            defaultValue="head"
            onValueChange={setSelectedService}
            className="flex flex-col space-y-2"
          >
            <div className="flex items-center space-x-2 text-black">
              <RadioGroupItem value="head" id="head" />
              <Label htmlFor="head">헤드 카피</Label>
            </div>
            <div className="flex items-center space-x-2 text-black">
              <RadioGroupItem value="body" id="body" />
              <Label htmlFor="body">바디 카피</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="flex justify-center">
          <Button 
            onClick={handleGenerateCopy}
            className="bg-[#40c4ff] hover:bg-[#00b0ff] text-white font-bold py-3 px-6 rounded-full transition-colors w-full max-w-md"
          >
            카피 생성
          </Button>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold mb-4 text-black">최종 카피</h3>
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex gap-3">
                  <span className="bg-[#40c4ff] text-white px-3 py-1 rounded-full text-sm font-medium">
                    {selectedService === "head" ? "헤드 카피" : "바디 카피"}
                  </span>
                  <span className="bg-gray-500 text-white px-3 py-1 rounded-full text-sm font-medium">상품 강조</span>
                </div>
                <p className="text-lg">버팔로 트레이스 위스키 - 부드러운 맛의 버번 위스키 정수</p>
                <p className="text-lg">부드러운 풍미와 달콤한 여운이 특징인 버팔로 트레이스 위스키 🥃</p>
                <p className="text-lg">짙임이나 메이커스 마크와 달리 더욱 온순한 성향의 버번 위스키</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}