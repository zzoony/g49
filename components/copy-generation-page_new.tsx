"use client"

import * as React from "react"
// import { ChevronDown } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const formatCopy = (text: string) => {
  return text.split('\n').map((line: string, index: number) => (
    <React.Fragment key={index}>
      {line}
      <br />
    </React.Fragment>
  ));
};

export function CopyGenerationPage() {
  const [product, setProduct] = React.useState('하이볼')
  const [theme, setTheme] = React.useState('할인')
  const [channel, setChannel] = React.useState('우리동네 GS APP')
  const [contentType, setContentType] = React.useState('이벤트 배너')
  const [targetAudience, setTargetAudience] = React.useState('20대 / 여성 / MZ세대')
  const [generatedCopy, setGeneratedCopy] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState("")

  const handleGenerateCopy = async () => {
    if (!product.trim()) {
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
          query: `${product} ${theme} ${channel} ${contentType} ${targetAudience}`,
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
    <div className="bg-gray-100 p-6 font-sans">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>💡 카피의 소재를 알려주세요</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="product" className="block mb-2 text-sm text-gray-600">제품 / 브랜드</label>
              <Input
                id="product"
                value={product}
                onChange={(e) => setProduct(e.target.value)}
                className="bg-gray-100"
              />
            </div>
            <div>
              <label htmlFor="theme" className="block mb-2 text-sm text-gray-600">테마 / 키워드</label>
              <Input
                id="theme"
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="bg-gray-100"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>💡 채널과 컨텐츠 타입 타겟을 알려주세요</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="channel" className="block mb-2 text-sm text-gray-600">채널</label>
              <Select value={channel} onValueChange={setChannel}>
                <SelectTrigger id="channel" className="bg-gray-100">
                  <SelectValue placeholder="채널 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="우리동네 GS APP">우리동네 GS APP</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label htmlFor="contentType" className="block mb-2 text-sm text-gray-600">컨텐츠 타입</label>
              <Select value={contentType} onValueChange={setContentType}>
                <SelectTrigger id="contentType" className="bg-gray-100">
                  <SelectValue placeholder="컨텐츠 타입 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="이벤트 배너">이벤트 배너</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label htmlFor="targetAudience" className="block mb-2 text-sm text-gray-600">타겟 (연령 / 성별 / 기타)</label>
              <Select value={targetAudience} onValueChange={setTargetAudience}>
                <SelectTrigger id="targetAudience" className="bg-gray-100">
                  <SelectValue placeholder="타겟 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="20대 / 여성 / MZ세대">20대 / 여성 / MZ세대</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center mb-6">
        <Button 
          onClick={handleGenerateCopy} 
          className="w-5/6 text-lg py-2"
          disabled={isLoading}
        >
          {isLoading ? '생성 중...' : '생성'}
        </Button>
      </div>

      {errorMessage && (
        <div className="text-red-500 text-center mb-6">{errorMessage}</div>
      )}

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>💡 제안드리는 내용입니다</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-100 p-4 rounded-lg mb-4 space-y-2">
            {generatedCopy ? formatCopy(generatedCopy) : (
              <>
                <p className="text-sm">{'#하이볼덕후들 모여라! 👋 하이볼 모음전 최대 40% 할인 (9/1~30일 초특가 행사)'}</p>
                <p className="text-sm">{'#MZ세대 전용사 하이볼 1+1 ✨ (배달, 픽업 주문 시 단독 혜택)'}</p>
                <p className="text-sm">{'#오늘도 하이볼 각? 🍹 휘화수 하이볼 4캔 9,900원 (9/1~9/18 한정 행사)'}</p>
                <p className="text-sm">{'#하이볼과 함께하는 힐링타임 🍋 (신상품 출시 기념 특별 할인)'}</p>
              </>
            )}
          </div>
          {/* <div className="bg-purple-100 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">저장 목록</h3>
            <p className="text-sm">{'#하이볼과 함께하는 힐링타임 🍋 (신상품 출시 기념 특별 할인)'}</p>
          </div> */}
        </CardContent>
      </Card>
    </div>
  )
}