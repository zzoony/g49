"use client"

import React, { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"

const formatCopy = (text: string) => { // 타입 추가
  return text.split('\n').map((line: string, index: number) => ( // 타입 추가
    <React.Fragment key={index}>
      {line}
      <br />
    </React.Fragment>
  ));
};

export function CopyGenerationPage() {
  const [selectedService, setSelectedService] = useState("banner") // 기본값 변경
  const [productName, setProductName] = useState("")
  const [generatedCopy, setGeneratedCopy] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const handleGenerateCopy = async () => {
    if (!productName.trim()) {
      setErrorMessage("제품 이름을 입력해주세요.");
      return;
    }

    setIsLoading(true)
    setErrorMessage("")

    try {
      const response = await fetch('https://api-mir.52g.ai/v1/chat-messages', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer app-NXaScDgwFCKaCpUFk4Pd398M',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: {},
          query: productName,
          response_mode: "blocking",
          conversation_id: "",
          user: "abc-123"
        })
      });

      if (!response.ok) {
        throw new Error('API 요청에 실패했습니다');
      }

      const data = await response.json();
      setGeneratedCopy(data.answer);
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage("카피 생성 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container mx-auto p-4 font-sans max-w-3xl bg-white">
      <h2 className="text-3xl font-bold text-blue-500 mb-8 pb-2 border-b-2 border-blue-500">카피 생성</h2>
      
      <div className="space-y-8">
        <div>
          <h3 className="text-xl font-semibold mb-3 text-black">제품 / 브랜드</h3>
          <Input 
            placeholder="버팔로 트레이스 위스키" 
            className="w-full text-black" 
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>
        
        <div>
          <h3 className="text-xl font-semibold mb-3 text-black">서비스 선택</h3>
          <RadioGroup
            defaultValue="banner" // 기본값 변경
            onValueChange={setSelectedService}
            className="flex flex-col space-y-2"
          >
            <div className="flex items-center space-x-2 text-black">
              <RadioGroupItem value="banner" id="banner" />
              <Label htmlFor="banner">배너 카피</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="flex justify-center">
          <Button 
            onClick={handleGenerateCopy}
            className="bg-[#40c4ff] hover:bg-[#00b0ff] text-white font-bold py-3 px-6 rounded-full transition-colors w-full max-w-md"
            disabled={isLoading}
          >
            {isLoading ? '생성 중...' : '카피 생성'}
          </Button>
        </div>
        
        {errorMessage && (
          <div className="text-red-500 text-center">{errorMessage}</div>
        )}
        
        <div>
          <h3 className="text-xl font-semibold mb-4 text-black">최종 카피</h3>
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex gap-3">
                  <span className="bg-[#40c4ff] text-white px-3 py-1 rounded-full text-sm font-medium">
                    {selectedService === "banner" ? "배너 카피" : "상품 강조"}
                  </span>
                </div>
                <div className="text-lg">
                  {generatedCopy ? formatCopy(generatedCopy) : ""}
                  
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}