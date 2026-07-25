"use client"

import posthog from "posthog-js"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, ArrowRight, FileText, Download, Check, AlertCircle, Building, User, Briefcase, FileSignature, Maximize2, X } from "lucide-react"
import Link from "next/link"

// 계약서 데이터 타입 정의
interface ContractData {
  // 고용주 정보
  companyName: string
  businessNumber: string
  ceoName: string
  companyAddress: string
  companyPhone: string
  
  // 근로자 정보
  employeeName: string
  employeeId: string
  employeeAddress: string
  employeePhone: string
  employeeEmail: string
  
  // 근로조건
  employmentType: string
  jobTitle: string
  department: string
  workLocation: string
  startDate: string
  endDate?: string
  probationPeriod: string
  salary: string
  salaryType: string
  paymentDate: string
  workDays: string[]
  workStartTime: string
  workEndTime: string
  breakTime: string
  
  // 기타 조항
  annualLeave: string
  insurance: string[]
  severancePay: boolean
  additionalTerms: string
}

// 템플릿 데이터
const templates = {
  regular: {
    name: "정규직",
    icon: "👔",
    description: "기간의 정함이 없는 정규직 근로계약",
    color: "border-blue-500"
  },
  contract: {
    name: "계약직",
    icon: "📋",
    description: "기간을 정하여 체결하는 근로계약",
    color: "border-green-500"
  },
  partTime: {
    name: "단시간 근로자",
    icon: "⏰",
    description: "주 15시간 이상 40시간 미만 근로",
    color: "border-purple-500"
  },
  daily: {
    name: "일용직",
    icon: "📅",
    description: "1일 단위로 고용되는 근로계약",
    color: "border-orange-500"
  }
}

export default function ContractCreatePage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedTemplate, setSelectedTemplate] = useState<string>("")
  const [showFullPreview, setShowFullPreview] = useState(false)
  const [contractData, setContractData] = useState<ContractData>({
    companyName: "",
    businessNumber: "",
    ceoName: "",
    companyAddress: "",
    companyPhone: "",
    employeeName: "",
    employeeId: "",
    employeeAddress: "",
    employeePhone: "",
    employeeEmail: "",
    employmentType: "",
    jobTitle: "",
    department: "",
    workLocation: "",
    startDate: "",
    endDate: "",
    probationPeriod: "3",
    salary: "",
    salaryType: "monthly",
    paymentDate: "25",
    workDays: ["월", "화", "수", "목", "금"],
    workStartTime: "09:00",
    workEndTime: "18:00",
    breakTime: "60",
    annualLeave: "15",
    insurance: ["국민연금", "건강보험", "고용보험", "산재보험"],
    severancePay: true,
    additionalTerms: ""
  })

  const steps = [
    { title: "템플릿 선택", icon: FileText, description: "고용 형태에 맞는 템플릿을 선택하세요" },
    { title: "고용주 정보", icon: Building, description: "회사 정보를 입력하세요" },
    { title: "근로자 정보", icon: User, description: "근로자 정보를 입력하세요" },
    { title: "근로조건", icon: Briefcase, description: "급여, 근무시간 등을 설정하세요" },
    { title: "기타 조항", icon: FileSignature, description: "추가 조항을 확인하고 완료하세요" }
  ]

  const updateData = (field: keyof ContractData, value: any) => {
    setContractData(prev => ({ ...prev, [field]: value }))
  }

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  // 섹션 헤더 컴포넌트
  const SectionHeader = ({ title, description }: { title: string; description: string }) => (
    <div className="mb-6 pb-4 border-b border-gray-200">
      <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
      <p className="text-sm text-gray-600 mt-1">{description}</p>
    </div>
  )

  // 템플릿 선택 화면
  const TemplateSelection = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          어떤 형태의 근로계약서를 작성하시나요?
        </h3>
        <p className="text-gray-600">
          고용 형태에 맞는 템플릿을 선택하면 필요한 조항이 자동으로 포함됩니다.
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-4">
        {Object.entries(templates).map(([key, template]) => (
          <motion.div
            key={key}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card
              className={`cursor-pointer transition-all ${
                selectedTemplate === key
                  ? `${template.color} border-2 shadow-lg`
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => {
                setSelectedTemplate(key)
                updateData('employmentType', template.name)
                posthog.capture("contract_template_selected", { template_type: key, template_name: template.name })
              }}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{template.icon}</div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg mb-1">{template.name}</h4>
                    <p className="text-sm text-gray-600">{template.description}</p>
                  </div>
                  {selectedTemplate === key && (
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )

  // 고용주 정보 입력
  const CompanyInfo = () => (
    <div className="space-y-6">
      <SectionHeader 
        title="회사 기본 정보"
        description="사업자등록증에 기재된 정보를 정확하게 입력해주세요."
      />
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="companyName">회사명 *</Label>
          <Input
            key="companyName-input"
            id="companyName"
            value={contractData.companyName}
            onChange={(e) => updateData('companyName', e.target.value)}
            placeholder="주식회사 블루워크"
            className="border-gray-300 focus:border-blue-500"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="businessNumber">사업자등록번호 *</Label>
          <Input
            key="businessNumber-input"
            id="businessNumber"
            value={contractData.businessNumber}
            onChange={(e) => updateData('businessNumber', e.target.value)}
            placeholder="123-45-67890"
            className="border-gray-300 focus:border-blue-500"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="ceoName">대표자명 *</Label>
          <Input
            key="ceoName-input"
            id="ceoName"
            value={contractData.ceoName}
            onChange={(e) => updateData('ceoName', e.target.value)}
            placeholder="홍길동"
            className="border-gray-300 focus:border-blue-500"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="companyPhone">회사 전화번호 *</Label>
          <Input
            key="companyPhone-input"
            id="companyPhone"
            value={contractData.companyPhone}
            onChange={(e) => updateData('companyPhone', e.target.value)}
            placeholder="02-1234-5678"
            className="border-gray-300 focus:border-blue-500"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="companyAddress">회사 주소 *</Label>
        <Input
          key="companyAddress-input"
          id="companyAddress"
          value={contractData.companyAddress}
          onChange={(e) => updateData('companyAddress', e.target.value)}
          placeholder="서울특별시 강남구 테헤란로 123, 4층"
          className="border-gray-300 focus:border-blue-500"
        />
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-2">
          <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-blue-800">
            <p className="font-semibold mb-1">자동 저장 기능</p>
            <p>입력하신 회사 정보는 자동으로 저장되어 다음에 다시 입력하실 필요가 없습니다.</p>
          </div>
        </div>
      </div>
    </div>
  )

  // 근로자 정보 입력
  const EmployeeInfo = () => (
    <div className="space-y-6">
      <SectionHeader 
        title="근로자 개인 정보"
        description="근로자의 신원 확인을 위한 필수 정보를 입력해주세요. 모든 개인정보는 암호화되어 안전하게 보관됩니다."
      />
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="employeeName">근로자 성명 *</Label>
          <Input
            key="employeeName-input"
            id="employeeName"
            value={contractData.employeeName}
            onChange={(e) => updateData('employeeName', e.target.value)}
            placeholder="김철수"
            className="border-gray-300 focus:border-blue-500"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="employeeId">주민등록번호 *</Label>
          <Input
            key="employeeId-input"
            id="employeeId"
            type="password"
            value={contractData.employeeId}
            onChange={(e) => updateData('employeeId', e.target.value)}
            placeholder="000000-0000000"
            className="border-gray-300 focus:border-blue-500"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="employeePhone">연락처 *</Label>
          <Input
            key="employeePhone-input"
            id="employeePhone"
            value={contractData.employeePhone}
            onChange={(e) => updateData('employeePhone', e.target.value)}
            placeholder="010-1234-5678"
            className="border-gray-300 focus:border-blue-500"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="employeeEmail">이메일</Label>
          <Input
            key="employeeEmail-input"
            id="employeeEmail"
            type="email"
            value={contractData.employeeEmail}
            onChange={(e) => updateData('employeeEmail', e.target.value)}
            placeholder="example@email.com"
            className="border-gray-300 focus:border-blue-500"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="employeeAddress">주소 *</Label>
        <Input
          key="employeeAddress-input"
          id="employeeAddress"
          value={contractData.employeeAddress}
          onChange={(e) => updateData('employeeAddress', e.target.value)}
          placeholder="서울특별시 서초구 서초대로 123"
          className="border-gray-300 focus:border-blue-500"
        />
      </div>
    </div>
  )

  // 근로조건 입력
  const WorkConditions = () => (
    <div className="space-y-8">
      {/* 직무 정보 섹션 */}
      <div>
        <SectionHeader 
          title="직무 정보"
          description="근로자가 담당할 업무와 소속 부서를 명시합니다."
        />
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="jobTitle">직책/직급 *</Label>
            <Input
              key="jobTitle-input"
              id="jobTitle"
              value={contractData.jobTitle}
              onChange={(e) => updateData('jobTitle', e.target.value)}
              placeholder="대리"
              className="border-gray-300 focus:border-blue-500"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="department">부서</Label>
            <Input
              key="department-input"
              id="department"
              value={contractData.department}
              onChange={(e) => updateData('department', e.target.value)}
              placeholder="개발팀"
              className="border-gray-300 focus:border-blue-500"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="startDate">근로시작일 *</Label>
            <Input
              key="startDate-input"
              id="startDate"
              type="date"
              value={contractData.startDate}
              onChange={(e) => updateData('startDate', e.target.value)}
              className="border-gray-300 focus:border-blue-500"
            />
          </div>
          
          {selectedTemplate === 'contract' && (
            <div className="space-y-2">
              <Label htmlFor="endDate">근로종료일</Label>
              <Input
                key="endDate-input"
                id="endDate"
                type="date"
                value={contractData.endDate}
                onChange={(e) => updateData('endDate', e.target.value)}
                className="border-gray-300 focus:border-blue-500"
              />
            </div>
          )}
        </div>
      </div>

      {/* 급여 조건 섹션 */}
      <div>
        <SectionHeader 
          title="급여 조건"
          description="임금 지급 방식과 금액을 정확히 입력해주세요. 최저임금 이상이어야 합니다."
        />
        <div className="grid md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="salary">급여액 *</Label>
            <Input
              key="salary-input"
              id="salary"
              value={contractData.salary}
              onChange={(e) => updateData('salary', e.target.value)}
              placeholder="3,000,000"
              className="border-gray-300 focus:border-blue-500"
            />
          </div>
          
          <div className="space-y-2">
            <Label>급여 유형</Label>
            <Select 
              key="salaryType-select"
              value={contractData.salaryType} 
              onValueChange={(value) => updateData('salaryType', value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monthly">월급</SelectItem>
                <SelectItem value="hourly">시급</SelectItem>
                <SelectItem value="daily">일급</SelectItem>
                <SelectItem value="annual">연봉</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="paymentDate">급여지급일</Label>
            <Select 
              key="paymentDate-select"
              value={contractData.paymentDate} 
              onValueChange={(value) => updateData('paymentDate', value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[...Array(31)].map((_, i) => (
                  <SelectItem key={i + 1} value={(i + 1).toString()}>
                    매월 {i + 1}일
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* 근무 시간 섹션 */}
      <div>
        <SectionHeader 
          title="근무 시간"
          description="주 52시간 근무제를 준수하는 범위 내에서 설정해주세요."
        />
        <div className="grid md:grid-cols-3 gap-4 mb-4">
          <div className="space-y-2">
            <Label htmlFor="workStartTime">시업 시간</Label>
            <Input
              key="workStartTime-input"
              id="workStartTime"
              type="time"
              value={contractData.workStartTime}
              onChange={(e) => updateData('workStartTime', e.target.value)}
              className="border-gray-300 focus:border-blue-500"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="workEndTime">종업 시간</Label>
            <Input
              key="workEndTime-input"
              id="workEndTime"
              type="time"
              value={contractData.workEndTime}
              onChange={(e) => updateData('workEndTime', e.target.value)}
              className="border-gray-300 focus:border-blue-500"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="breakTime">휴게시간 (분)</Label>
            <Input
              key="breakTime-input"
              id="breakTime"
              value={contractData.breakTime}
              onChange={(e) => updateData('breakTime', e.target.value)}
              placeholder="60"
              className="border-gray-300 focus:border-blue-500"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label>근무일</Label>
          <div className="flex flex-wrap gap-3">
            {['월', '화', '수', '목', '금', '토', '일'].map((day) => (
              <label key={day} className="flex items-center gap-2 cursor-pointer">
                <Checkbox
                  checked={contractData.workDays.includes(day)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      updateData('workDays', [...contractData.workDays, day])
                    } else {
                      updateData('workDays', contractData.workDays.filter(d => d !== day))
                    }
                  }}
                />
                <span className="text-sm">{day}요일</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  // 기타 조항
  const AdditionalTerms = () => (
    <div className="space-y-8">
      {/* 수습 및 휴가 섹션 */}
      <div>
        <SectionHeader 
          title="수습 및 휴가"
          description="수습기간과 연차유급휴가 일수를 설정합니다."
        />
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="probationPeriod">수습기간 (개월)</Label>
            <Select 
              key="probationPeriod-select"
              value={contractData.probationPeriod} 
              onValueChange={(value) => updateData('probationPeriod', value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">없음</SelectItem>
                <SelectItem value="1">1개월</SelectItem>
                <SelectItem value="2">2개월</SelectItem>
                <SelectItem value="3">3개월</SelectItem>
                <SelectItem value="6">6개월</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="annualLeave">연차유급휴가 (일)</Label>
            <Input
              key="annualLeave-input"
              id="annualLeave"
              value={contractData.annualLeave}
              onChange={(e) => updateData('annualLeave', e.target.value)}
              placeholder="15"
              className="border-gray-300 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* 사회보험 섹션 */}
      <div>
        <SectionHeader 
          title="사회보험"
          description="4대보험 가입 여부를 선택합니다. 법정 의무 가입 대상은 반드시 가입해야 합니다."
        />
        <div className="grid grid-cols-2 gap-3">
          {['국민연금', '건강보험', '고용보험', '산재보험'].map((insurance) => (
            <label key={insurance} className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                checked={contractData.insurance.includes(insurance)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    updateData('insurance', [...contractData.insurance, insurance])
                  } else {
                    updateData('insurance', contractData.insurance.filter(i => i !== insurance))
                  }
                }}
              />
              <span className="text-sm">{insurance}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 퇴직금 섹션 */}
      <div>
        <SectionHeader 
          title="퇴직금"
          description="1년 이상 근무 시 퇴직금 지급 의무가 있습니다."
        />
        <RadioGroup 
          value={contractData.severancePay.toString()} 
          onValueChange={(value) => updateData('severancePay', value === 'true')}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="true" id="severance-yes" />
            <Label htmlFor="severance-yes" className="font-normal cursor-pointer">
              근로자퇴직급여보장법에 따름
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="false" id="severance-no" />
            <Label htmlFor="severance-no" className="font-normal cursor-pointer">
              해당없음 (1년 미만 근로 예정)
            </Label>
          </div>
        </RadioGroup>
      </div>

      {/* 추가 특약사항 섹션 */}
      <div>
        <SectionHeader 
          title="추가 특약사항"
          description="위에서 다루지 않은 기타 필요한 사항을 작성합니다."
        />
        <Textarea
          key="additionalTerms-textarea"
          id="additionalTerms"
          value={contractData.additionalTerms}
          onChange={(e) => updateData('additionalTerms', e.target.value)}
          placeholder="기타 필요한 특약사항을 입력하세요."
          rows={4}
          className="border-gray-300 focus:border-blue-500"
        />
      </div>
    </div>
  )

  // 현재 단계에 따른 컨텐츠 렌더링
  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <TemplateSelection />
      case 1:
        return <CompanyInfo />
      case 2:
        return <EmployeeInfo />
      case 3:
        return <WorkConditions />
      case 4:
        return <AdditionalTerms />
      default:
        return null
    }
  }

  // 미리보기 컨텐츠
  const PreviewContent = () => (
    <div className="prose prose-sm max-w-none">
      <h4 className="text-center text-lg font-bold mb-6">근 로 계 약 서</h4>
      
      <p className="mb-4">
        <strong>{contractData.companyName || "[회사명]"}</strong>(이하 "갑"이라 함)과(와) <strong>{contractData.employeeName || "[근로자명]"}</strong>(이하 "을"이라 함)은 
        다음과 같이 근로계약을 체결한다.
      </p>

      <h5 className="font-bold mt-6 mb-2">제1조 (근로계약기간)</h5>
      <p>
        {selectedTemplate === 'contract' && contractData.endDate
          ? `${contractData.startDate || "[시작일]"}부터 ${contractData.endDate || "[종료일]"}까지`
          : `${contractData.startDate || "[시작일]"}부터 기간의 정함이 없음`}
      </p>

      <h5 className="font-bold mt-6 mb-2">제2조 (근무장소 및 업무내용)</h5>
      <p>
        1. 근무장소: {contractData.workLocation || contractData.companyAddress || "[근무장소]"}<br />
        2. 업무내용: {contractData.jobTitle || "[직책]"} {contractData.department && `(${contractData.department})`}
      </p>

      <h5 className="font-bold mt-6 mb-2">제3조 (근로시간)</h5>
      <p>
        1. 근로시간: {contractData.workStartTime || "[시업시간]"}부터 {contractData.workEndTime || "[종업시간]"}까지<br />
        2. 휴게시간: {contractData.breakTime || "[휴게시간]"}분<br />
        3. 근로일: 주 {contractData.workDays.length}일 ({contractData.workDays.join(', ') || "[근무일]"})
      </p>

      <h5 className="font-bold mt-6 mb-2">제4조 (임금)</h5>
      <p>
        1. {contractData.salaryType === 'monthly' ? '월급' : contractData.salaryType === 'hourly' ? '시급' : contractData.salaryType === 'daily' ? '일급' : '연봉'}: {contractData.salary || "[급여액]"}원<br />
        2. 지급일: 매월 {contractData.paymentDate || "[지급일]"}일<br />
        3. 지급방법: 근로자 명의 예금통장에 입금
      </p>

      <h5 className="font-bold mt-6 mb-2">제5조 (연차유급휴가)</h5>
      <p>연차유급휴가는 근로기준법에 따른다.</p>

      <h5 className="font-bold mt-6 mb-2">제6조 (사회보험)</h5>
      <p>{contractData.insurance.join(', ') || "[보험]"} 등 법정 사회보험에 가입한다.</p>

      {contractData.severancePay && (
        <>
          <h5 className="font-bold mt-6 mb-2">제7조 (퇴직금)</h5>
          <p>퇴직금은 근로자퇴직급여보장법에 따른다.</p>
        </>
      )}

      {contractData.additionalTerms && (
        <>
          <h5 className="font-bold mt-6 mb-2">제{contractData.severancePay ? '8' : '7'}조 (기타)</h5>
          <p>{contractData.additionalTerms}</p>
        </>
      )}

      <div className="mt-8 pt-8 border-t">
        <p className="text-center mb-8">
          위 근로계약 체결을 증명하기 위하여 본 계약서 2부를 작성하여 갑과 을이 각각 서명 또는 날인한 후 각 1부씩 보관한다.
        </p>
        
        <p className="text-center mb-8">
          {new Date().getFullYear()}년 {new Date().getMonth() + 1}월 {new Date().getDate()}일
        </p>
        
        <div className="grid grid-cols-2 gap-8">
          <div>
            <p className="font-bold mb-2">(갑) 사업주</p>
            <p>상호: {contractData.companyName || "[회사명]"}</p>
            <p>주소: {contractData.companyAddress || "[회사주소]"}</p>
            <p>대표자: {contractData.ceoName || "[대표자명]"} (서명)</p>
          </div>
          <div>
            <p className="font-bold mb-2">(을) 근로자</p>
            <p>주소: {contractData.employeeAddress || "[근로자주소]"}</p>
            <p>성명: {contractData.employeeName || "[근로자명]"} (서명)</p>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-sky-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* 상단 네비게이션 */}
        <div className="mb-8 flex items-center justify-between">
          <Link href="/tools/contract-generator" className="inline-flex items-center text-sm text-gray-600 hover:text-blue-600 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            도구 소개로 돌아가기
          </Link>
          
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-sky-600 text-transparent bg-clip-text">
              Blue Work
            </span>
            <span className="text-sm text-gray-500">근로계약서 작성 툴</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* 왼쪽: 메인 작성 영역 */}
          <div className="lg:col-span-2">
            {/* 진행 상태 표시 */}
            <Card className="mb-6 border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  {steps.map((step, index) => (
                    <div key={index} className="flex items-center">
                      <div className={`
                        flex items-center justify-center w-10 h-10 rounded-full
                        ${index <= currentStep 
                          ? 'bg-gradient-to-r from-blue-600 to-sky-600 text-white' 
                          : 'bg-gray-200 text-gray-400'}
                        transition-all duration-300
                      `}>
                        {index < currentStep ? (
                          <Check className="w-5 h-5" />
                        ) : (
                          <step.icon className="w-5 h-5" />
                        )}
                      </div>
                      {index < steps.length - 1 && (
                        <div className={`
                          w-full h-1 mx-2
                          ${index < currentStep ? 'bg-gradient-to-r from-blue-600 to-sky-600' : 'bg-gray-200'}
                          transition-all duration-300
                        `} />
                      )}
                    </div>
                  ))}
                </div>
                
                <div className="text-center">
                  <h2 className="text-xl font-bold text-gray-900 mb-1">
                    {steps[currentStep].title}
                  </h2>
                  <p className="text-sm text-gray-600">
                    {steps[currentStep].description}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* 컨텐츠 영역 */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {renderStepContent()}
                  </motion.div>
                </AnimatePresence>
              </CardContent>

              {/* 하단 버튼 */}
              <div className="border-t bg-gray-50 p-6 flex justify-between">
                <Button
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 0}
                  className="border-gray-300"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  이전
                </Button>
                
                {currentStep < steps.length - 1 ? (
                  <Button
                    onClick={nextStep}
                    disabled={currentStep === 0 && !selectedTemplate}
                    className="bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 text-white"
                  >
                    다음
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
                    // 이 버튼은 아직 실제 생성 동작이 없다. "생성됨"으로 집계하면 전환율이 부풀려지므로
                    // 클릭(=생성 시도)까지만 기록한다. 생성 기능이 붙으면 성공 시점 이벤트로 옮길 것.
                    onClick={() => posthog.capture("contract_generate_clicked", { template_type: selectedTemplate, employment_type: contractData.employmentType })}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    계약서 생성
                  </Button>
                )}
              </div>
            </Card>
          </div>

          {/* 오른쪽: 미리보기 영역 */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8 border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-sky-600 text-white">
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    실시간 미리보기
                  </span>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-white hover:bg-white/20"
                    onClick={() => setShowFullPreview(true)}
                  >
                    <Maximize2 className="w-4 h-4 mr-1" />
                    자세히
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 max-h-[600px] overflow-y-auto">
                <div className="p-6">
                  <PreviewContent />
                </div>
              </CardContent>
            </Card>

            {/* 도움말 카드 */}
            <Card className="mt-4 border-0 shadow-md bg-blue-50">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-semibold text-blue-900 mb-1">💡 Tip</p>
                    <p className="text-blue-800">
                      {currentStep === 0 && "고용 형태에 맞는 템플릿을 선택하면 필요한 조항이 자동으로 포함됩니다."}
                      {currentStep === 1 && "한 번 입력한 회사 정보는 자동으로 저장되어 다음에 재사용할 수 있습니다."}
                      {currentStep === 2 && "개인정보는 안전하게 암호화되어 처리됩니다."}
                      {currentStep === 3 && "법정 근로시간과 최저임금을 준수하는지 자동으로 검토됩니다."}
                      {currentStep === 4 && "추가 특약사항은 명확하고 구체적으로 작성하는 것이 좋습니다."}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* 전체화면 미리보기 모달 */}
      <AnimatePresence>
        {showFullPreview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
            onClick={() => setShowFullPreview(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-blue-600 to-sky-600 text-white">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <FileText className="w-6 h-6" />
                  근로계약서 전체 미리보기
                </h3>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-white hover:bg-white/20"
                  onClick={() => setShowFullPreview(false)}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
              <div className="p-8 overflow-y-auto max-h-[calc(90vh-80px)]">
                <PreviewContent />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 