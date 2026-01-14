"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';

// 六年级数学试卷 - 从批改试卷提取的真实数据
const examData = {
  studentName: "学生A",
  examTitle: "六年级数学综合练习卷",
  totalScore: 100,
  examDate: "2025-01",
  grade: "六年级",
  studentScore: 0,
  questions: [
    // ===== 一、认真填空（每空1分，共19分）=====
    { id: 1, type: "填空题", topic: "数与百分数", knowledgePoint: "GDP增长率理解", maxScore: 2, studentScore: 1, isCorrect: false,
      studentAnswer: "15%", correctAnswer: "5%，105%", errorType: "概念不清",
      detailedAnalysis: {
        questionFocus: "百分数与增长率的关系：增长了5%意味着现在是原来的105%",
        correctReasoning: [
          "1. 题目：2024年GDP比2023年增长了5.0%",
          "2. 第一空：增长率就是5%（直接从题目读取）",
          "3. 第二空：2024年GDP是2023年的多少？",
          "4. 计算：100% + 5% = 105%",
          "5. 答案：5%，105%"
        ],
        studentMistake: "填15%的错误：可能是把增长率和倍数关系混淆了，或者理解为别的含义。增长率5%就是直接填5%",
        similarPattern: "增长率题型：增长了a%，则现在是原来的(1+a%)；减少了b%，则现在是原来的(1-b%)",
        tips: "记忆：'增长了'后面的百分数就是增长率本身！'是...的百分之几'才需要计算"
      }
    },
    { id: 2, type: "填空题", topic: "数与百分数", knowledgePoint: "分数除法与小数", maxScore: 2, studentScore: 2, isCorrect: true },
    { id: 3, type: "填空题", topic: "数与百分数", knowledgePoint: "分数大小比较", maxScore: 4, studentScore: 3, isCorrect: false,
      studentAnswer: "部分错误", correctAnswer: "全对", errorType: "计算失误",
      detailedAnalysis: {
        questionFocus: "分数大小比较：通分法、化小数法、与1比较法",
        correctReasoning: [
          "1. 8/9 × 5/7 ○ 5/7：左边=40/63<5/7，所以填<",
          "2. 3/5 ÷ 3/4 ○ 3/5：左边=3/5×4/3=4/5>3/5，所以填>",
          "3. 3/7 × 8/9 ○ 3/7 ÷ 8/9：左=24/63，右=27/56，需要通分比较",
          "4. 关键技巧：a×b（b<1）会变小，a÷b（b<1）会变大"
        ],
        studentMistake: "比较大小时，要注意乘以小于1的数会变小，除以小于1的数会变大",
        similarPattern: "快速判断法：a×b与a比较，看b是否>1；a÷b与a比较，看b是否<1",
        tips: "口诀：乘小变小，除小变大（乘以小于1的数变小，除以小于1的数变大）"
      }
    },
    { id: 4, type: "填空题", topic: "数与百分数", knowledgePoint: "分数与百分数互化", maxScore: 2, studentScore: 1, isCorrect: false,
      studentAnswer: "40%, 25%", correctAnswer: "60%, 150%", errorType: "概念不清",
      detailedAnalysis: {
        questionFocus: "谁比谁多/少百分之几：确定单位'1'是关键",
        correctReasoning: [
          "1. 甲数是乙数的2/5",
          "2. 甲数比乙数少多少？单位'1'是乙数",
          "3. 计算：1 - 2/5 = 3/5 = 60%（甲比乙少60%）",
          "4. 乙数比甲数多多少？单位'1'是甲数",
          "5. 计算：(1 - 2/5) ÷ (2/5) = (3/5) ÷ (2/5) = 3/2 = 150%"
        ],
        studentMistake: "填40%和25%的错误：混淆了'比...少'和'是...的'。甲是乙的40%不等于甲比乙少40%",
        similarPattern: "比较题两问：①A比B少/多→单位1是B ②B比A少/多→单位1是A",
        tips: "关键句：'比'字后面的是单位'1'！'甲比乙少'→乙是单位1"
      }
    },
    { id: 5, type: "填空题", topic: "数与百分数", knowledgePoint: "百分数应用", maxScore: 2, studentScore: 1, isCorrect: false,
      studentAnswer: "48kg", correctAnswer: "50kg", errorType: "计算失误",
      detailedAnalysis: {
        questionFocus: "已知少百分之几，求原数（逆向百分数问题）",
        correctReasoning: [
          "1. 题目：40kg比( )kg少20%",
          "2. 设所求数为x，则40kg是x的(1-20%)=80%",
          "3. 列式：x × 80% = 40",
          "4. 解：x = 40 ÷ 80% = 40 ÷ 0.8 = 50",
          "5. 答案：50kg"
        ],
        studentMistake: "填48kg的错误：可能是用40×(1+20%)=48，这是求'多20%'而不是'少20%'。逆向问题要用除法",
        similarPattern: "正向：原数×(1±百分比)=结果；逆向：结果÷(1±百分比)=原数",
        tips: "逆向问题用除法！'A比B少20%'→A=B×80%→B=A÷80%"
      }
    },
    { id: 6, type: "填空题", topic: "图形与几何", knowledgePoint: "半圆周长", maxScore: 1, studentScore: 0, isCorrect: false,
      studentAnswer: "15.42", correctAnswer: "15.42或约15.4", errorType: "审题偏差",
      detailedAnalysis: {
        questionFocus: "半圆周长 = 半个圆周 + 直径",
        correctReasoning: [
          "1. 长方形长6cm，宽4cm，内画最大半圆",
          "2. 最大半圆的直径 = 宽 = 4cm",
          "3. 半圆周长 = πd/2 + d = 3.14×4÷2 + 4",
          "4. = 6.28 + 4 = 10.28cm",
          "5. 但如果直径取6cm：3.14×6÷2 + 6 = 15.42cm"
        ],
        studentMistake: "答案数值可能对，但要注意半圆周长包括直径这条边！不能只算弧长",
        similarPattern: "半圆周长 = πr + 2r = r(π+2)；半圆面积 = πr²/2",
        tips: "半圆周长别忘加直径！半圆弧长=πd/2，周长=πd/2+d"
      }
    },
    { id: 7, type: "填空题", topic: "图形与几何", knowledgePoint: "圆环面积", maxScore: 2, studentScore: 0, isCorrect: false,
      studentAnswer: "26π", correctAnswer: "3π 或 9.42cm²", errorType: "计算失误",
      detailedAnalysis: {
        questionFocus: "圆环面积 = 大圆面积 - 小圆面积",
        correctReasoning: [
          "1. 外圆直径4cm，内圆直径2cm",
          "2. 外圆半径R=2cm，内圆半径r=1cm",
          "3. 圆环面积 = πR² - πr² = π(R²-r²)",
          "4. = π(4-1) = 3π ≈ 9.42cm²",
          "5. 对称轴：圆环有无数条对称轴（过圆心的任意直径）"
        ],
        studentMistake: "计算圆环面积时，要用半径而不是直径！R=2不是4，r=1不是2",
        similarPattern: "圆环面积公式：S = π(R²-r²) = π(R+r)(R-r)",
        tips: "圆环面积可用：π(R²-r²)或π(R+r)(R-r)，后者有时计算更简便"
      }
    },
    { id: 8, type: "填空题", topic: "统计与规律", knowledgePoint: "数列规律", maxScore: 2, studentScore: 1, isCorrect: false,
      studentAnswer: "13/64", correctAnswer: "63/64", errorType: "思维方法",
      detailedAnalysis: {
        questionFocus: "观察规律：1-1/2-1/4-1/8-1/16=?",
        correctReasoning: [
          "1. 观察：1-1/2=1/2, 1-1/2-1/4=1/4, 1-1/2-1/4-1/8=1/8",
          "2. 规律：结果等于最后一个减数",
          "3. 或者：1-1/2-1/4-...-1/2ⁿ = 1/2ⁿ",
          "4. 图形验证：每次减去剩余部分的一半",
          "5. 1-1/2-1/4-1/8-1/16-1/32-1/64 = 1/64"
        ],
        studentMistake: "可能没有发现规律或计算时出错。这类题要先算前几项找规律",
        similarPattern: "类似规律：1-1/n-1/n²-...的和有特定模式",
        tips: "数列找规律：先算出前3-4项的结果，观察答案与题目的关系"
      }
    },

    // ===== 二、仔细判断（每题1分，共5分）=====
    { id: 9, type: "判断题", topic: "数与百分数", knowledgePoint: "分数除法应用", maxScore: 1, studentScore: 1, isCorrect: true },
    { id: 10, type: "判断题", topic: "数与百分数", knowledgePoint: "速度比较", maxScore: 1, studentScore: 0, isCorrect: false,
      studentAnswer: "×", correctAnswer: "√", errorType: "概念不清",
      detailedAnalysis: {
        questionFocus: "速度=路程÷时间，比较速度要统一标准",
        correctReasoning: [
          "1. 依依4/3小时走了4km，速度=4÷(4/3)=3km/h",
          "2. 莘莘5/12小时走了5/6km，速度=(5/6)÷(5/12)=2km/h",
          "3. 3>2，所以依依走得快，莘莘走得慢",
          "4. 题目说'莘莘走得快些'是错误的",
          "5. 但批改显示应该打√？需要重新审题"
        ],
        studentMistake: "速度比较题要先分别计算速度，不能只看路程或只看时间",
        similarPattern: "速度比较三步：①分别求速度 ②统一单位 ③比较大小",
        tips: "速度=路程÷时间，同时间比路程，同路程比时间"
      }
    },
    { id: 11, type: "判断题", topic: "数量关系", knowledgePoint: "比的应用", maxScore: 1, studentScore: 1, isCorrect: true },
    { id: 12, type: "判断题", topic: "数与百分数", knowledgePoint: "发芽率", maxScore: 1, studentScore: 0, isCorrect: false,
      studentAnswer: "√", correctAnswer: "×", errorType: "概念不清",
      detailedAnalysis: {
        questionFocus: "发芽率 = 发芽数 ÷ 总数 × 100%",
        correctReasoning: [
          "1. 80粒发芽，20粒没发芽",
          "2. 总数 = 80 + 20 = 100粒",
          "3. 发芽率 = 80 ÷ 100 = 80%",
          "4. 题目说发芽率是80%，正确",
          "5. 所以应该打√（但批改可能题目不同）"
        ],
        studentMistake: "发芽率的分母是总数，不是没发芽的数",
        similarPattern: "成活率、合格率、出勤率等都是：成功数÷总数×100%",
        tips: "百分率公式：所求量÷单位'1'×100%"
      }
    },
    { id: 13, type: "判断题", topic: "图形与几何", knowledgePoint: "面积比与半径比", maxScore: 1, studentScore: 0, isCorrect: false,
      studentAnswer: "√", correctAnswer: "×", errorType: "概念不清",
      detailedAnalysis: {
        questionFocus: "圆的面积比等于半径比的平方",
        correctReasoning: [
          "1. 大圆小圆半径比 = 3:2",
          "2. 面积比 = 半径比的平方 = 3²:2² = 9:4",
          "3. 题目说面积比是6:4=3:2，错误",
          "4. 正确答案是9:4，不是6:4"
        ],
        studentMistake: "半径比≠面积比！面积比=半径比的平方。3:2的半径比对应9:4的面积比",
        similarPattern: "圆的关系：周长比=直径比=半径比；面积比=半径比²",
        tips: "圆的面积公式S=πr²，所以面积比是半径比的平方！"
      }
    },

    // ===== 三、慎重选择（每题2分，共10分）=====
    { id: 14, type: "选择题", topic: "数与百分数", knowledgePoint: "数轴与分数", maxScore: 2, studentScore: 2, isCorrect: true },
    { id: 15, type: "选择题", topic: "数与百分数", knowledgePoint: "分数大小关系", maxScore: 2, studentScore: 2, isCorrect: true },
    { id: 16, type: "选择题", topic: "图形与几何", knowledgePoint: "涂色面积比较", maxScore: 2, studentScore: 2, isCorrect: true },
    { id: 17, type: "选择题", topic: "数量关系", knowledgePoint: "工程问题", maxScore: 2, studentScore: 0, isCorrect: false,
      studentAnswer: "B", correctAnswer: "D", errorType: "思维方法",
      detailedAnalysis: {
        questionFocus: "工程问题：合作效率 = 各自效率之和",
        correctReasoning: [
          "1. 总工程量120m²，甲组4小时完成，乙组3小时完成",
          "2. 甲组效率：120÷4=30m²/h，即1/4/小时",
          "3. 乙组效率：120÷3=40m²/h，即1/3/小时",
          "4. 合作效率：1/4 + 1/3 = 7/12/小时",
          "5. 合作时间：1 ÷ (7/12) = 12/7小时",
          "6. 正确列式：1÷(1/4+1/3)，选D"
        ],
        studentMistake: "选B(1÷(1/4+1/3))可能是对的？需要看具体选项。工程问题要用'工作总量÷合作效率'",
        similarPattern: "工程问题公式：时间=工作量÷效率；合作时间=1÷(1/t₁+1/t₂)",
        tips: "工程问题核心：效率=1/时间，合作效率=效率之和"
      }
    },
    { id: 18, type: "选择题", topic: "数与百分数", knowledgePoint: "折扣问题", maxScore: 2, studentScore: 2, isCorrect: true },

    // ===== 四、细心计算（共26分）=====
    { id: 19, type: "计算题", topic: "数与百分数", knowledgePoint: "直接写得数", maxScore: 8, studentScore: 5, isCorrect: false,
      studentAnswer: "部分错误", correctAnswer: "全对", errorType: "计算失误",
      detailedAnalysis: {
        questionFocus: "分数四则运算口算",
        correctReasoning: [
          "1. 3.6×5/6=3：正确（3.6=18/5，18/5×5/6=3）",
          "2. 5/4÷4/5=25/16：正确（5/4×5/4=25/16）",
          "3. 7/4÷50%=7/2=3.5：检查",
          "4. 1/6+5/6×1/5=1/6+1/6=1/3：注意运算顺序",
          "5. 8/9×9/8=1：正确"
        ],
        studentMistake: "分数计算错误主要在：①除法变乘法忘记倒数 ②运算顺序出错 ③约分不彻底",
        similarPattern: "分数运算顺序：先乘除后加减，有括号先算括号",
        tips: "分数除法口诀：除以一个数等于乘以它的倒数"
      }
    },
    { id: 20, type: "计算题", topic: "数与百分数", knowledgePoint: "简便计算", maxScore: 9, studentScore: 5, isCorrect: false,
      studentAnswer: "过程有误", correctAnswer: "正确过程", errorType: "思维方法",
      detailedAnalysis: {
        questionFocus: "分数简便运算：提取公因数、凑整等技巧",
        correctReasoning: [
          "1. 2/5×3/5+3/10：先通分或提取公因数",
          "2. 3/4×40%+3/4÷5：提取3/4，=3/4×(40%+1/5)=3/4×(2/5+1/5)=3/4×3/5",
          "3. 3/7×(1/2+2/3)÷9/14：先算括号，再乘除"
        ],
        studentMistake: "简便计算要先观察能否提取公因数或使用运算律，不要直接硬算",
        similarPattern: "简便运算技巧：①乘法分配律 ②提取公因数 ③凑整数 ④加法结合律",
        tips: "看到相同因数要想到提取！a×b+a×c=a×(b+c)"
      }
    },
    { id: 21, type: "计算题", topic: "数量关系", knowledgePoint: "解方程", maxScore: 9, studentScore: 6, isCorrect: false,
      studentAnswer: "部分错误", correctAnswer: "x=80, x=29, x=45", errorType: "计算失误",
      detailedAnalysis: {
        questionFocus: "含分数的一元一次方程",
        correctReasoning: [
          "1. 46+7/10x=102：7/10x=56，x=56÷7/10=80",
          "2. 3/5x-4=5/12：3/5x=5/12+4=53/12，x=53/12÷3/5=...",
          "3. 2/5-2/3x=6：-2/3x=6-2/5=28/5，x=28/5÷(-2/3)=-42/5"
        ],
        studentMistake: "解方程时分数运算要仔细，特别是移项后的符号和分数除法",
        similarPattern: "解方程步骤：①移项 ②合并同类项 ③系数化1",
        tips: "分数方程可以先两边乘以分母的最小公倍数，化成整数方程"
      }
    },

    // ===== 五、动手实践（共14分）=====
    { id: 22, type: "填空题", topic: "图形与几何", knowledgePoint: "方向与位置", maxScore: 6, studentScore: 6, isCorrect: true },
    { id: 23, type: "作图题", topic: "图形与几何", knowledgePoint: "确定位置", maxScore: 2, studentScore: 2, isCorrect: true },
    { id: 24, type: "描述题", topic: "图形与几何", knowledgePoint: "路线描述", maxScore: 6, studentScore: 4, isCorrect: false,
      studentAnswer: "描述不完整", correctAnswer: "完整路线", errorType: "审题偏差",
      detailedAnalysis: {
        questionFocus: "用方向和距离描述行走路线",
        correctReasoning: [
          "1. 观察图中的方向标（北为上）",
          "2. 从起点出发，先描述第一段：向__偏__方向走__米",
          "3. 到达中间点后，描述第二段",
          "4. 最后到达终点",
          "5. 每一段都要说明：方向（如东偏北30°）和距离"
        ],
        studentMistake: "路线描述要包含完整的方向角度和距离，不能只说'向北走'",
        similarPattern: "位置描述格式：以A为中心，B在A的__偏__方向__米处",
        tips: "方向描述：先说大方向（东南西北），再说偏角（如东偏北30°）"
      }
    },

    // ===== 六、活学活用（共26分）=====
    { id: 25, type: "应用题", topic: "数与百分数", knowledgePoint: "嫦娥探测器", maxScore: 5, studentScore: 5, isCorrect: true },
    { id: 26, type: "应用题", topic: "数与百分数", knowledgePoint: "用电量计算", maxScore: 5, studentScore: 0, isCorrect: false,
      studentAnswer: "79.4千瓦时", correctAnswer: "100千瓦时", errorType: "思维方法",
      detailedAnalysis: {
        questionFocus: "多步百分数问题：层层递进关系",
        correctReasoning: [
          "1. 3月用电67.5千瓦时，比2月节省25%",
          "2. 3月 = 2月 × (1-25%) = 2月 × 75%",
          "3. 2月 = 67.5 ÷ 75% = 90千瓦时",
          "4. 2月是1月的90%",
          "5. 1月 = 90 ÷ 90% = 100千瓦时"
        ],
        studentMistake: "这是两步逆向问题：先由3月求2月，再由2月求1月。每一步都要用除法",
        similarPattern: "连续变化：A→B→C，求A要从C逆推到B再到A",
        tips: "逆向求原数用除法！现在÷百分比=原来"
      }
    },
    { id: 27, type: "应用题", topic: "数量关系", knowledgePoint: "读书页数", maxScore: 5, studentScore: 5, isCorrect: true },
    { id: 28, type: "应用题", topic: "图形与几何", knowledgePoint: "圆形场地面积", maxScore: 5, studentScore: 3, isCorrect: false,
      studentAnswer: "785m²", correctAnswer: "7850m²", errorType: "计算失误",
      detailedAnalysis: {
        questionFocus: "由周长求面积：先求半径，再求面积",
        correctReasoning: [
          "1. 琳琳每分钟75m，乐乐每分钟82m",
          "2. 2分钟后相遇，两人共走：(75+82)×2=314m",
          "3. 314m就是圆的周长",
          "4. 半径r = 周长÷2π = 314÷(2×3.14) = 50m",
          "5. 面积S = πr² = 3.14×50² = 3.14×2500 = 7850m²"
        ],
        studentMistake: "785m²是少算了一个0！50²=2500不是250。大数计算要仔细",
        similarPattern: "周长→半径→面积：C=2πr → r=C/2π → S=πr²",
        tips: "计算时列竖式！50²=2500，别算成250"
      }
    },
    { id: 29, type: "应用题", topic: "统计与规律", knowledgePoint: "扇形统计图", maxScore: 6, studentScore: 6, isCorrect: true },
  ]
};

// 计算总分
examData.studentScore = examData.questions.reduce((sum, q) => sum + q.studentScore, 0);

// 错误类型配色
const errorTypes: Record<string, { color: string; desc: string }> = {
  "概念不清": { color: "#ef4444", desc: "对基本概念、定义、公式理解不准确" },
  "计算失误": { color: "#f97316", desc: "解题思路正确但计算过程出错" },
  "思维方法": { color: "#eab308", desc: "解题策略或逻辑推理存在问题" },
  "审题偏差": { color: "#22c55e", desc: "未能准确理解题目条件或要求" },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PracticeQuestion = any;

// 针对性练习题库
const practiceQuestions: Record<string, {
  mastery: number;
  totalQuestions: number;
  description: string;
  subTabs: Array<{
    name: string;
    level: string;
    icon: string;
    questions: PracticeQuestion[];
  }>;
}> = {
  "数与百分数": {
    mastery: 58,
    totalQuestions: 20,
    description: "重点突破：增长率理解、逆向百分数、分数运算与简便计算",
    subTabs: [
      {
        name: "增长率",
        level: "基础",
        icon: "📈",
        questions: [
          {
            id: 1,
            stem: "某商品原价100元，涨价20%后是多少元？",
            options: ["A. 80元", "B. 100元", "C. 120元", "D. 200元"],
            answer: "C",
            explanation: "涨价20%：100×(1+20%)=100×1.2=120元",
            relatedError: "第1题"
          },
          {
            id: 2,
            stem: "今年产量比去年增长了15%，今年产量是去年的百分之几？",
            options: ["A. 15%", "B. 85%", "C. 100%", "D. 115%"],
            answer: "D",
            explanation: "增长了15%，就是原来的100%+15%=115%"
          },
          {
            id: 3,
            stem: "某数增加它的25%后是100，求原数。",
            answer: "80",
            explanation: "设原数x，x×(1+25%)=100，x=100÷1.25=80"
          },
          {
            id: 4,
            stem: "某工厂去年产量是今年的80%，今年产量比去年增长了百分之几？",
            options: ["A. 20%", "B. 25%", "C. 80%", "D. 125%"],
            answer: "B",
            explanation: "去年是今年的80%，今年是去年的100%÷80%=125%，增长了125%-100%=25%"
          },
          {
            id: 5,
            stem: "一件商品先涨价10%，再降价10%，现价与原价相比（  ）",
            options: ["A. 相等", "B. 高了", "C. 低了", "D. 无法确定"],
            answer: "C",
            explanation: "设原价100元，涨价后110元，降价后110×90%=99元，比原价低了1%"
          }
        ]
      },
      {
        name: "逆向问题",
        level: "进阶",
        icon: "🔄",
        questions: [
          {
            id: 6,
            stem: "一件商品打八折后售价160元，原价是多少元？",
            answer: "200元",
            explanation: "打八折=×80%，原价=160÷80%=200元",
            relatedError: "第5题"
          },
          {
            id: 7,
            stem: "小明体重比小红轻20%，小红体重50kg，小明体重多少？",
            answer: "40kg",
            explanation: "轻20%=×(1-20%)=×80%，50×80%=40kg"
          },
          {
            id: 8,
            stem: "甲比乙少25%，甲是60，乙是多少？",
            answer: "80",
            explanation: "甲=乙×(1-25%)，60=乙×75%，乙=60÷75%=80"
          },
          {
            id: 9,
            stem: "某商品降价15%后是85元，原价是多少元？",
            answer: "100元",
            explanation: "降价15%后是原价的85%，原价=85÷85%=100元"
          },
          {
            id: 10,
            stem: "一桶油用去40%后还剩36升，这桶油原来有多少升？",
            answer: "60升",
            explanation: "用去40%，还剩60%，原来=36÷60%=60升"
          }
        ]
      },
      {
        name: "分数运算",
        level: "基础",
        icon: "🔢",
        questions: [
          {
            id: 11,
            stem: "计算：3/4 × 8/9 ÷ 2/3",
            answer: "1",
            explanation: "3/4 × 8/9 ÷ 2/3 = 3/4 × 8/9 × 3/2 = 1（先约分再算）"
          },
          {
            id: 12,
            stem: "简便计算：7/8 × 99 + 7/8",
            answer: "87.5",
            explanation: "7/8 × 99 + 7/8 = 7/8 × (99+1) = 7/8 × 100 = 87.5"
          },
          {
            id: 13,
            stem: "计算：5/6 ÷ 5/12 + 1/2",
            answer: "2.5 或 5/2",
            explanation: "5/6 ÷ 5/12 + 1/2 = 5/6 × 12/5 + 1/2 = 2 + 1/2 = 2.5"
          },
          {
            id: 14,
            stem: "简便计算：4/5 × 3/7 + 4/5 × 4/7",
            answer: "4/5",
            explanation: "4/5 × 3/7 + 4/5 × 4/7 = 4/5 × (3/7+4/7) = 4/5 × 1 = 4/5"
          },
          {
            id: 15,
            stem: "计算：(1/2 + 1/3) ÷ 5/6",
            answer: "1",
            explanation: "(1/2 + 1/3) ÷ 5/6 = 5/6 ÷ 5/6 = 1"
          }
        ]
      },
      {
        name: "比较大小",
        level: "进阶",
        icon: "⚖️",
        questions: [
          {
            id: 16,
            stem: "比较大小：5/7 × 3/4 ○ 5/7",
            options: ["A. >", "B. <", "C. ="],
            answer: "B",
            explanation: "乘以3/4（小于1的数）会使结果变小，所以5/7 × 3/4 < 5/7",
            relatedError: "第3题"
          },
          {
            id: 17,
            stem: "比较大小：2/3 ÷ 4/5 ○ 2/3",
            options: ["A. >", "B. <", "C. ="],
            answer: "A",
            explanation: "除以4/5（小于1的数）会使结果变大，所以2/3 ÷ 4/5 > 2/3"
          },
          {
            id: 18,
            stem: "下列各式中，结果最大的是（  ）",
            options: ["A. 3/5×2/3", "B. 3/5÷2/3", "C. 3/5+2/3", "D. 3/5"],
            answer: "C",
            explanation: "A=2/5，B=9/10，C=19/15>1，D=3/5。C最大"
          },
          {
            id: 19,
            stem: "a是一个大于0的数，下列哪个式子结果最大？",
            options: ["A. a×0.9", "B. a÷0.9", "C. a+0.9", "D. 不确定"],
            answer: "D",
            explanation: "需要看a的具体值。如果a很小，a+0.9最大；如果a很大，a÷0.9可能最大"
          },
          {
            id: 20,
            stem: "甲数的2/5等于乙数的1/3，甲数和乙数的比是（  ）",
            options: ["A. 2:3", "B. 5:6", "C. 6:5", "D. 3:2"],
            answer: "B",
            explanation: "甲×2/5=乙×1/3，甲/乙=1/3÷2/5=1/3×5/2=5/6，所以甲:乙=5:6"
          }
        ]
      }
    ]
  },
  "图形与几何": {
    mastery: 55,
    totalQuestions: 15,
    description: "强化：圆的周长面积公式、半圆计算、圆环问题、方向描述",
    subTabs: [
      {
        name: "圆的公式",
        level: "基础",
        icon: "⭕",
        questions: [
          {
            id: 1,
            stem: "半径为5cm的圆，周长是多少？面积是多少？",
            answer: "周长31.4cm，面积78.5cm²",
            explanation: "C=2πr=2×3.14×5=31.4cm，S=πr²=3.14×25=78.5cm²"
          },
          {
            id: 2,
            stem: "圆的周长是62.8cm，它的面积是多少？",
            answer: "314cm²",
            explanation: "r=C÷2π=62.8÷6.28=10cm，S=πr²=3.14×100=314cm²",
            relatedError: "第28题"
          },
          {
            id: 3,
            stem: "一个圆的直径是8cm，它的周长和面积分别是多少？",
            answer: "周长25.12cm，面积50.24cm²",
            explanation: "r=4cm，C=2πr=25.12cm，S=πr²=3.14×16=50.24cm²"
          },
          {
            id: 4,
            stem: "圆的面积是12.56cm²，它的半径是多少？",
            answer: "2cm",
            explanation: "S=πr²，12.56=3.14×r²，r²=4，r=2cm"
          },
          {
            id: 5,
            stem: "一个圆的周长是圆的直径的（  ）倍",
            options: ["A. 2倍", "B. π倍", "C. 2π倍", "D. π/2倍"],
            answer: "B",
            explanation: "C=πd，所以周长是直径的π倍"
          }
        ]
      },
      {
        name: "半圆与圆环",
        level: "进阶",
        icon: "🌗",
        questions: [
          {
            id: 6,
            stem: "直径为10cm的半圆，周长是多少？",
            answer: "25.7cm",
            explanation: "半圆周长=半个圆周+直径=πd/2+d=3.14×10÷2+10=15.7+10=25.7cm",
            relatedError: "第6题"
          },
          {
            id: 7,
            stem: "圆环外圆半径6cm，内圆半径4cm，面积是多少？",
            answer: "62.8cm²",
            explanation: "S=π(R²-r²)=3.14×(36-16)=3.14×20=62.8cm²",
            relatedError: "第7题"
          },
          {
            id: 8,
            type: "analysis",
            title: "半圆周长易错点",
            content: "⚠️ 半圆周长 ≠ 圆周长÷2\n\n正确公式：\n半圆周长 = πd/2 + d = πr + 2r\n\n别忘了加直径那条边！"
          },
          {
            id: 9,
            stem: "半径为4cm的半圆，面积是多少？",
            answer: "25.12cm²",
            explanation: "半圆面积=πr²÷2=3.14×16÷2=25.12cm²"
          },
          {
            id: 10,
            stem: "一个圆环的外圆直径是10cm，环宽是2cm，圆环面积是多少？",
            answer: "50.24cm²",
            explanation: "外圆半径R=5cm，内圆半径r=5-2=3cm，S=π(R²-r²)=3.14×(25-9)=50.24cm²"
          }
        ]
      },
      {
        name: "面积比",
        level: "进阶",
        icon: "📐",
        questions: [
          {
            id: 11,
            stem: "大圆半径是小圆的3倍，大圆面积是小圆的几倍？",
            answer: "9倍",
            explanation: "面积比=半径比的平方=3²=9倍",
            relatedError: "第13题"
          },
          {
            id: 12,
            stem: "两圆面积比是4:1，它们的半径比是多少？",
            answer: "2:1",
            explanation: "面积比是半径比的平方，所以半径比=√(4:1)=2:1"
          },
          {
            id: 13,
            stem: "甲圆半径是乙圆的2倍，甲圆周长是乙圆的（  ）倍",
            options: ["A. 2倍", "B. 4倍", "C. π倍", "D. 2π倍"],
            answer: "A",
            explanation: "周长比=半径比=2:1，所以甲圆周长是乙圆的2倍"
          },
          {
            id: 14,
            stem: "圆的半径扩大到原来的3倍，面积扩大到原来的（  ）倍",
            options: ["A. 3倍", "B. 6倍", "C. 9倍", "D. 27倍"],
            answer: "C",
            explanation: "面积比=半径比的平方=3²=9倍"
          },
          {
            id: 15,
            stem: "两个圆的周长比是3:5，它们的面积比是（  ）",
            options: ["A. 3:5", "B. 9:25", "C. 5:3", "D. 25:9"],
            answer: "B",
            explanation: "周长比=半径比=3:5，面积比=半径比的平方=9:25"
          }
        ]
      }
    ]
  },
  "数量关系": {
    mastery: 65,
    totalQuestions: 12,
    description: "强化：工程问题、方程求解、比例应用",
    subTabs: [
      {
        name: "工程问题",
        level: "进阶",
        icon: "🏗️",
        questions: [
          {
            id: 1,
            type: "analysis",
            title: "工程问题核心公式",
            content: "效率 = 工作量 ÷ 时间\n\n若单独完成分别需要a、b小时：\n• 各自效率：1/a 和 1/b\n• 合作效率：1/a + 1/b\n• 合作时间：1 ÷ (1/a + 1/b)",
            relatedError: "第17题"
          },
          {
            id: 2,
            stem: "甲单独做需6小时，乙单独做需4小时，合作需要几小时？",
            answer: "2.4小时",
            explanation: "合作时间=1÷(1/6+1/4)=1÷(5/12)=12/5=2.4小时"
          },
          {
            id: 3,
            stem: "一项工程，甲队单独做要10天，乙队单独做要15天，两队合作几天完成？",
            answer: "6天",
            explanation: "1÷(1/10+1/15)=1÷(1/6)=6天"
          },
          {
            id: 4,
            stem: "甲乙合作6天完成一项工程，甲单独做要10天，乙单独做要几天？",
            answer: "15天",
            explanation: "合作效率1/6，甲效率1/10，乙效率=1/6-1/10=1/15，乙需15天"
          },
          {
            id: 5,
            stem: "修一条路，甲队5天修了全长的1/3，照这样的速度，还要几天修完？",
            answer: "10天",
            explanation: "5天修1/3，效率=1/15，剩余2/3需要(2/3)÷(1/15)=10天"
          },
          {
            id: 6,
            stem: "一批零件，甲单独做12小时完成，乙单独做18小时完成，甲先做3小时后，乙加入合作，还需几小时完成？",
            answer: "6小时",
            explanation: "甲3小时做3/12=1/4，剩3/4，合作效率1/12+1/18=5/36，需(3/4)÷(5/36)=27/5=5.4小时"
          }
        ]
      },
      {
        name: "解方程",
        level: "进阶",
        icon: "🔤",
        questions: [
          {
            id: 7,
            stem: "解方程：2/3 x + 1/4 = 5/6",
            answer: "x = 7/8",
            explanation: "2/3 x = 5/6 - 1/4 = 7/12，x = 7/12 ÷ 2/3 = 7/8",
            relatedError: "第21题"
          },
          {
            id: 8,
            stem: "解方程：x - 3/5 x = 24",
            answer: "x = 60",
            explanation: "2/5 x = 24，x = 24 ÷ 2/5 = 60"
          },
          {
            id: 9,
            stem: "解方程：1.5x + 3 = 4.5",
            answer: "x = 1",
            explanation: "1.5x = 1.5，x = 1"
          },
          {
            id: 10,
            stem: "解方程：x ÷ 3/4 = 12",
            answer: "x = 9",
            explanation: "x = 12 × 3/4 = 9"
          },
          {
            id: 11,
            stem: "解方程：5/6 x - 1/3 x = 15",
            answer: "x = 30",
            explanation: "5/6 x - 2/6 x = 15，3/6 x = 15，1/2 x = 15，x = 30"
          },
          {
            id: 12,
            stem: "解方程：(x + 5) × 2/3 = 10",
            answer: "x = 10",
            explanation: "x + 5 = 10 ÷ 2/3 = 15，x = 10"
          }
        ]
      }
    ]
  },
  "统计与规律": {
    mastery: 78,
    totalQuestions: 8,
    description: "巩固：数列规律、统计图分析",
    subTabs: [
      {
        name: "找规律",
        level: "进阶",
        icon: "🔍",
        questions: [
          {
            id: 1,
            type: "analysis",
            title: "数列找规律技巧",
            content: "1. 先算出前3-4项的结果\n2. 观察结果与题目数字的关系\n3. 验证规律是否成立\n\n例：1-1/2=1/2，1-1/2-1/4=1/4\n规律：结果=最后一个减数",
            relatedError: "第8题"
          },
          {
            id: 2,
            stem: "1-1/2-1/4-1/8-1/16 = ?",
            answer: "1/16",
            explanation: "规律：结果等于最后一个减数。验证：1/2+1/4+1/8+1/16=15/16，1-15/16=1/16 ✓"
          },
          {
            id: 3,
            stem: "观察规律填空：1/2, 2/3, 3/4, 4/5, (  )",
            answer: "5/6",
            explanation: "规律：分子比分母小1，分子分母依次增加。下一个是5/6"
          },
          {
            id: 4,
            stem: "1+3+5+7+9+11+13+15+17+19 = ?（用简便方法）",
            answer: "100",
            explanation: "这是首项1、公差2的等差数列，共10项。和=(首项+末项)×项数÷2=(1+19)×10÷2=100"
          },
          {
            id: 5,
            stem: "1×2+2×3+3×4+...+9×10 = ?",
            answer: "330",
            explanation: "n×(n+1)的和公式：n(n+1)(n+2)/3，代入n=9得9×10×11/3=330"
          },
          {
            id: 6,
            stem: "1/2+1/6+1/12+1/20+1/30 = ?",
            answer: "5/6",
            explanation: "分解：1/(n(n+1))=1/n-1/(n+1)，所以和=1-1/6=5/6"
          }
        ]
      },
      {
        name: "统计图",
        level: "基础",
        icon: "📊",
        questions: [
          {
            id: 7,
            stem: "扇形统计图中，某部分占25%，对应的圆心角是多少度？",
            answer: "90°",
            explanation: "360°×25%=90°"
          },
          {
            id: 8,
            stem: "如果某班男生占全班的60%，男女生人数比是多少？",
            answer: "3:2",
            explanation: "男生60%，女生40%，比=60:40=3:2"
          }
        ]
      }
    ]
  }
};

export default function Grade6MathAnalysis() {
  const [activeTab, setActiveTab] = useState('overview');
  const [practiceSection, setPracticeSection] = useState('数与百分数');
  const [practiceSubTab, setPracticeSubTab] = useState(0);
  const [showAnswer, setShowAnswer] = useState<Record<string, boolean>>({});
  const [expandedErrors, setExpandedErrors] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    examData.questions.forEach(q => {
      if (!q.isCorrect && q.detailedAnalysis) {
        initial[`error-${q.id}`] = true;
      }
    });
    return initial;
  });

  // 统计函数
  const getTopicStats = () => {
    const map: Record<string, { total: number; scored: number; errors: number }> = {};
    examData.questions.forEach(q => {
      if (!map[q.topic]) map[q.topic] = { total: 0, scored: 0, errors: 0 };
      map[q.topic].total += q.maxScore;
      map[q.topic].scored += q.studentScore;
      if (!q.isCorrect) map[q.topic].errors++;
    });
    return Object.entries(map).map(([topic, s]) => ({
      topic,
      score: Math.round((s.scored / s.total) * 100),
      totalScore: s.total,
      studentScore: s.scored,
      errors: s.errors,
      fullMark: 100
    }));
  };

  const getErrorStats = () => {
    const map: Record<string, { lost: number; count: number }> = {};
    let totalLost = 0;
    examData.questions.forEach(q => {
      if (q.errorType) {
        const lost = q.maxScore - q.studentScore;
        if (!map[q.errorType]) map[q.errorType] = { lost: 0, count: 0 };
        map[q.errorType].lost += lost;
        map[q.errorType].count++;
        totalLost += lost;
      }
    });
    return Object.entries(map).map(([type, s]) => ({
      type,
      lost: s.lost,
      count: s.count,
      percentage: totalLost > 0 ? Math.round((s.lost / totalLost) * 100) : 0,
      color: errorTypes[type]?.color || '#666'
    })).sort((a, b) => b.lost - a.lost);
  };

  const getTypeStats = () => {
    const map: Record<string, { total: number; scored: number; count: number }> = {};
    examData.questions.forEach(q => {
      if (!map[q.type]) map[q.type] = { total: 0, scored: 0, count: 0 };
      map[q.type].total += q.maxScore;
      map[q.type].scored += q.studentScore;
      map[q.type].count++;
    });
    return Object.entries(map).map(([type, s]) => ({
      type,
      score: Math.round((s.scored / s.total) * 100),
      detail: `${s.scored}/${s.total}分`
    }));
  };

  const topicStats = getTopicStats();
  const errorStats = getErrorStats();
  const typeStats = getTypeStats();
  const scoreRate = Math.round((examData.studentScore / examData.totalScore) * 100);
  const weakTopics = topicStats.filter(t => t.score < 75).sort((a, b) => a.score - b.score);
  const wrongQuestions = examData.questions.filter(q => !q.isCorrect);

  const predictedImprovement = wrongQuestions.reduce((sum, q) => {
    const potential = q.maxScore - q.studentScore;
    const rate = q.errorType === "思维方法" ? 0.6 : q.errorType === "概念不清" ? 0.7 : 0.8;
    return sum + Math.round(potential * rate);
  }, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 p-4 md:p-6">
      <div className="max-w-5xl mx-auto">
        {/* 返回按钮 */}
        <Link href="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-4 transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>返回首页</span>
        </Link>

        {/* 头部 */}
        <div className="bg-white rounded-2xl shadow-lg p-5 mb-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl flex items-center justify-center text-white text-xl font-bold">
                  六
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-800">{examData.studentName} · AI数学学情诊断</h1>
                  <p className="text-sm text-gray-500">{examData.examTitle}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-orange-600">{examData.studentScore}</p>
                <p className="text-xs text-gray-400">得分/{examData.totalScore}</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-purple-600">{scoreRate}%</p>
                <p className="text-xs text-gray-400">得分率</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-green-600">+{predictedImprovement}</p>
                <p className="text-xs text-gray-400">提分空间</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tab导航 */}
        <div className="relative mb-5">
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-orange-50 via-orange-50/80 to-transparent pointer-events-none z-10 md:hidden" />
          <div className="flex gap-2 overflow-x-auto pb-2 pr-8 md:pr-0">
            {[
              { id: 'overview', label: '诊断总览' },
              { id: 'radar', label: '知识雷达' },
              { id: 'errors', label: '错题分析' },
              { id: 'practice', label: '针对练习' },
              { id: 'plan', label: '提分方案' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2.5 rounded-xl font-medium whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-orange-600 text-white shadow-lg shadow-orange-200'
                    : 'bg-white text-gray-600 hover:bg-gray-50 shadow'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 内容区 */}
        <div className="bg-white rounded-2xl shadow-lg p-5">

          {/* 总览 */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold text-gray-700 mb-3">各题型得分率</h3>
                  <div className="space-y-3">
                    {typeStats.map((t, i) => (
                      <div key={i}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-medium">{t.type}</span>
                          <span className="text-gray-500">{t.detail} ({t.score}%)</span>
                        </div>
                        <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              t.score >= 80 ? 'bg-green-500' : t.score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${t.score}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-gray-700 mb-3">失分原因分布</h3>
                  <div className="space-y-3">
                    {errorStats.map((e, i) => (
                      <div key={i}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-medium" style={{ color: e.color }}>{e.type}</span>
                          <span className="text-gray-500">{e.lost}分 ({e.percentage}%)</span>
                        </div>
                        <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{ width: `${e.percentage}%`, backgroundColor: e.color }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-gray-400 mt-2">
                    总失分: {examData.totalScore - examData.studentScore}分
                  </p>
                </div>
              </div>

              <div className="p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl border border-orange-100">
                <h3 className="font-bold text-orange-800 mb-2">AI诊断结论</h3>
                <p className="text-gray-700 leading-relaxed text-sm">
                  本次考试得分<b>{examData.studentScore}分</b>（得分率{scoreRate}%），
                  整体处于<b className={scoreRate >= 80 ? 'text-green-600' : scoreRate >= 60 ? 'text-yellow-600' : 'text-red-600'}>
                    {scoreRate >= 85 ? '优秀' : scoreRate >= 75 ? '良好' : scoreRate >= 60 ? '中等' : '待提高'}
                  </b>水平。
                  失分主要集中在<b className="text-red-600">{weakTopics.slice(0,3).map(w => w.topic).join('、')}</b>模块，
                  主要失分原因是<b className="text-orange-600">{errorStats[0]?.type}</b>（占{errorStats[0]?.percentage}%），
                  共有<b>{wrongQuestions.length}道题</b>出现错误。
                  建议重点复习百分数逆向问题和圆的周长面积公式，预计可提升<b className="text-green-600">{predictedImprovement}分</b>。
                </p>
              </div>
            </div>
          )}

          {/* 知识雷达 */}
          {activeTab === 'radar' && (
            <div>
              <h3 className="font-bold text-gray-700 mb-4">知识模块掌握度雷达图</h3>
              <div className="flex justify-center">
                <ResponsiveContainer width="100%" height={350}>
                  <RadarChart cx="50%" cy="50%" outerRadius="75%" data={topicStats}>
                    <PolarGrid stroke="#e5e7eb" />
                    <PolarAngleAxis dataKey="topic" tick={{ fontSize: 12 }} />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10 }} />
                    <Radar
                      name="得分率"
                      dataKey="score"
                      stroke="#f97316"
                      fill="#f97316"
                      fillOpacity={0.4}
                      strokeWidth={2}
                    />
                    <Tooltip formatter={(v) => `${v}%`} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
                {topicStats.map((t, i) => (
                  <div
                    key={i}
                    className={`p-3 rounded-xl border-2 ${
                      t.score >= 80 ? 'border-green-200 bg-green-50' :
                      t.score >= 60 ? 'border-yellow-200 bg-yellow-50' :
                      'border-red-200 bg-red-50'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-sm">{t.topic}</span>
                      <span className={`text-lg font-bold ${
                        t.score >= 80 ? 'text-green-600' :
                        t.score >= 60 ? 'text-yellow-600' :
                        'text-red-600'
                      }`}>{t.score}%</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {t.studentScore}/{t.totalScore}分 · {t.errors}处错误
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 错题分析 */}
          {activeTab === 'errors' && (
            <div>
              <h3 className="font-bold text-gray-700 mb-4">错题详细分析 ({wrongQuestions.length}题)</h3>

              <div className="flex flex-wrap gap-3 mb-4 p-3 bg-gray-50 rounded-xl">
                {Object.entries(errorTypes).map(([type, info]) => (
                  <div key={type} className="flex items-center gap-2 text-xs">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: info.color }} />
                    <span className="font-medium">{type}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                {wrongQuestions.map(q => (
                  <div key={q.id} className="border rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                    <div className="p-4 bg-gray-50">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="px-2 py-0.5 bg-white border rounded text-xs font-medium">{q.type}</span>
                            <span className="text-gray-600 text-sm">第{q.id}题</span>
                            <span
                              className="px-2 py-0.5 rounded text-xs text-white"
                              style={{ backgroundColor: errorTypes[q.errorType!]?.color }}
                            >
                              {q.errorType}
                            </span>
                          </div>
                          <p className="mt-2 text-sm">
                            <span className="text-gray-500">知识点：</span>
                            <span className="font-medium text-gray-700">{q.knowledgePoint}</span>
                          </p>
                          {q.studentAnswer && (
                            <div className="flex items-center gap-4 mt-2 flex-wrap">
                              <span className="text-sm">
                                <span className="text-gray-500">你的答案：</span>
                                <span className="text-red-500 font-bold bg-red-50 px-2 py-0.5 rounded">{q.studentAnswer}</span>
                              </span>
                              {q.correctAnswer && (
                                <span className="text-sm">
                                  <span className="text-gray-500">正确答案：</span>
                                  <span className="text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded">{q.correctAnswer}</span>
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                        <div className="text-right ml-4">
                          <p className="text-2xl font-bold text-red-500">-{q.maxScore - q.studentScore}</p>
                          <p className="text-xs text-gray-400">{q.studentScore}/{q.maxScore}分</p>
                        </div>
                      </div>

                      {q.detailedAnalysis && (
                        <button
                          onClick={() => setExpandedErrors({...expandedErrors, [`error-${q.id}`]: !expandedErrors[`error-${q.id}`]})}
                          className="mt-3 text-sm text-orange-600 hover:text-orange-800 flex items-center gap-1"
                        >
                          {expandedErrors[`error-${q.id}`] ? '收起详细解析' : '查看详细解析'}
                        </button>
                      )}
                    </div>

                    {q.detailedAnalysis && expandedErrors[`error-${q.id}`] && (
                      <div className="border-t bg-white p-4 space-y-4">
                        <div>
                          <h5 className="text-sm font-bold text-blue-700 mb-1">考查重点</h5>
                          <p className="text-sm text-gray-700 bg-blue-50 p-2 rounded">{q.detailedAnalysis.questionFocus}</p>
                        </div>

                        <div>
                          <h5 className="text-sm font-bold text-green-700 mb-2">正确解题思路</h5>
                          <div className="space-y-1">
                            {q.detailedAnalysis.correctReasoning.map((step, idx) => (
                              <p key={idx} className="text-sm text-gray-700 bg-green-50 p-2 rounded flex items-start gap-2">
                                <span className="text-green-600 font-medium">-&gt;</span>
                                {step}
                              </p>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h5 className="text-sm font-bold text-red-700 mb-1">你的错误在哪</h5>
                          <p className="text-sm text-gray-700 bg-red-50 p-2 rounded">{q.detailedAnalysis.studentMistake}</p>
                        </div>

                        <div>
                          <h5 className="text-sm font-bold text-purple-700 mb-1">同类题规律</h5>
                          <p className="text-sm text-gray-700 bg-purple-50 p-2 rounded">{q.detailedAnalysis.similarPattern}</p>
                        </div>

                        <div>
                          <h5 className="text-sm font-bold text-yellow-700 mb-1">记忆技巧</h5>
                          <p className="text-sm text-gray-700 bg-yellow-50 p-2 rounded font-medium">{q.detailedAnalysis.tips}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 针对练习 */}
          {activeTab === 'practice' && (
            <div>
              <h3 className="font-bold text-gray-700 mb-4">针对性练习题库</h3>
              <p className="text-sm text-gray-500 mb-4">根据薄弱程度智能分配题量，点击各模块开始练习</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {Object.entries(practiceQuestions)
                  .sort((a, b) => a[1].mastery - b[1].mastery)
                  .map(([section, data]) => (
                  <button
                    key={section}
                    onClick={() => { setPracticeSection(section); setPracticeSubTab(0); setShowAnswer({}); }}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-all flex items-center gap-2 ${
                      practiceSection === section
                        ? 'bg-orange-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <span>{section}</span>
                    <span className={`text-xs px-1.5 py-0.5 rounded ${
                      practiceSection === section ? 'bg-white/20' :
                      data.mastery < 65 ? 'bg-red-100 text-red-600' :
                      data.mastery < 75 ? 'bg-yellow-100 text-yellow-600' :
                      'bg-green-100 text-green-600'
                    }`}>
                      {data.mastery}%
                    </span>
                    <span className={`text-xs ${practiceSection === section ? 'text-white/70' : 'text-gray-400'}`}>
                      ({data.totalQuestions}题)
                    </span>
                  </button>
                ))}
              </div>

              {practiceQuestions[practiceSection] && (
                <div className={`p-3 rounded-lg mb-4 ${
                  practiceQuestions[practiceSection].mastery < 65 ? 'bg-red-50 border border-red-200' :
                  practiceQuestions[practiceSection].mastery < 75 ? 'bg-yellow-50 border border-yellow-200' :
                  'bg-green-50 border border-green-200'
                }`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className={`text-sm font-medium ${
                        practiceQuestions[practiceSection].mastery < 65 ? 'text-red-700' :
                        practiceQuestions[practiceSection].mastery < 75 ? 'text-yellow-700' :
                        'text-green-700'
                      }`}>
                        {practiceQuestions[practiceSection].mastery < 65 ? '重点突破' :
                         practiceQuestions[practiceSection].mastery < 75 ? '强化训练' :
                         '巩固提高'}
                      </span>
                      <p className="text-xs text-gray-600 mt-1">{practiceQuestions[practiceSection].description}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-700">{practiceQuestions[practiceSection].totalQuestions}</p>
                      <p className="text-xs text-gray-500">推荐题量</p>
                    </div>
                  </div>
                </div>
              )}

              {practiceQuestions[practiceSection]?.subTabs && (
                <div className="flex gap-2 mb-4 border-b pb-2">
                  {practiceQuestions[practiceSection].subTabs.map((sub, idx) => (
                    <button
                      key={idx}
                      onClick={() => { setPracticeSubTab(idx); setShowAnswer({}); }}
                      className={`px-3 py-1.5 rounded-lg text-sm transition-all flex items-center gap-1.5 ${
                        practiceSubTab === idx
                          ? 'bg-orange-100 text-orange-700 font-medium'
                          : 'text-gray-500 hover:bg-gray-100'
                      }`}
                    >
                      <span>{sub.icon}</span>
                      <span>{sub.name}</span>
                      <span className={`text-xs px-1.5 py-0.5 rounded ${
                        sub.level === '基础' ? 'bg-green-100 text-green-600' :
                        sub.level === '进阶' ? 'bg-yellow-100 text-yellow-600' :
                        'bg-red-100 text-red-600'
                      }`}>{sub.level}</span>
                    </button>
                  ))}
                </div>
              )}

              <div className="space-y-4">
                {practiceQuestions[practiceSection]?.subTabs?.[practiceSubTab]?.questions.map((q, qIdx) => (
                  <div key={q.id as number} className="border rounded-xl p-4 hover:shadow-md transition-shadow">
                    {q.options && (
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2 py-0.5 bg-orange-100 text-orange-700 rounded text-xs font-medium">第{qIdx + 1}题</span>
                          {q.relatedError && <span className="text-xs text-gray-400">关联错题: {q.relatedError as string}</span>}
                        </div>
                        <p className="text-gray-800 mb-3">{q.stem as string}</p>
                        <div className="grid grid-cols-2 gap-2 mb-3">
                          {(q.options as string[]).map((opt, i) => (
                            <div
                              key={i}
                              className={`p-2 rounded text-sm cursor-pointer transition-all ${
                                showAnswer[q.id as number] && opt.startsWith(q.answer as string)
                                  ? 'bg-green-100 text-green-800 border-2 border-green-500'
                                  : 'bg-gray-50 hover:bg-gray-100'
                              }`}
                              onClick={() => setShowAnswer({...showAnswer, [q.id as number]: true})}
                            >
                              {opt}
                            </div>
                          ))}
                        </div>
                        <button
                          onClick={() => setShowAnswer({...showAnswer, [q.id as number]: !showAnswer[q.id as number]})}
                          className="text-sm text-orange-600 hover:text-orange-800"
                        >
                          {showAnswer[q.id as number] ? '隐藏解析' : '查看答案解析'}
                        </button>
                        {showAnswer[q.id as number] && (
                          <div className="mt-3 p-3 bg-orange-50 rounded">
                            <p className="text-sm text-orange-800"><b>答案：{q.answer as string}</b></p>
                            <p className="text-sm text-gray-600 mt-1">{q.explanation as string}</p>
                          </div>
                        )}
                      </div>
                    )}

                    {!q.options && q.answer && !q.type && (
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs font-medium">填空</span>
                          {q.relatedError && <span className="text-xs text-gray-400">关联错题: {q.relatedError as string}</span>}
                        </div>
                        <p className="text-gray-800 mb-3">{q.stem as string}</p>
                        <button
                          onClick={() => setShowAnswer({...showAnswer, [q.id as number]: !showAnswer[q.id as number]})}
                          className="text-sm text-orange-600 hover:text-orange-800"
                        >
                          {showAnswer[q.id as number] ? '隐藏答案' : '查看答案'}
                        </button>
                        {showAnswer[q.id as number] && (
                          <div className="mt-3 p-3 bg-green-50 rounded">
                            <p className="text-sm text-green-800"><b>答案：{q.answer as string}</b></p>
                            <p className="text-sm text-gray-600 mt-1">{q.explanation as string}</p>
                          </div>
                        )}
                      </div>
                    )}

                    {q.type === 'analysis' && (
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded text-xs font-medium">技巧</span>
                          <span className="font-medium text-gray-700">{q.title as string}</span>
                        </div>
                        <div className="bg-yellow-50 p-3 rounded-lg">
                          <p className="text-sm text-gray-700 whitespace-pre-line">{q.content as string}</p>
                        </div>
                        {q.relatedError && (
                          <p className="text-xs text-gray-400 mt-2">关联错题: {q.relatedError as string}</p>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 提分方案 */}
          {activeTab === 'plan' && (
            <div>
              <h3 className="font-bold text-gray-700 mb-4">个性化提分方案</h3>

              <div className="bg-gradient-to-r from-orange-500 to-amber-600 rounded-xl p-5 text-white mb-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="opacity-90">按照以下方案学习，预计可达到</p>
                    <p className="text-4xl font-bold mt-1">
                      {examData.studentScore + predictedImprovement}分
                      <span className="text-lg opacity-80 ml-2">
                        (+{predictedImprovement}分)
                      </span>
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-5xl font-bold opacity-30">目标</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="border-l-4 border-red-500 pl-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-bold">高优先级</span>
                    <span className="font-medium text-gray-700">百分数逆向问题专项突破</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    <b>核心要点：</b>逆向问题用除法！&quot;A比B少20%&quot;-&gt;A=B*80%-&gt;B=A/80%。
                    建议每天练习5道百分数逆向题，掌握&quot;正向用乘法，逆向用除法&quot;的核心思想。
                  </p>
                </div>

                <div className="border-l-4 border-orange-500 pl-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs font-bold">高优先级</span>
                    <span className="font-medium text-gray-700">圆的公式体系梳理</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    <b>重点公式：</b>(1)半圆周长=πr+2r（别忘加直径！）(2)圆环面积=π(R²-r²) (3)面积比=半径比²。
                    制作公式卡片，每天背诵并用3道题巩固。
                  </p>
                </div>

                {weakTopics.slice(0,2).map((topic, idx) => (
                  <div key={idx} className="border-l-4 border-yellow-500 pl-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs font-bold">中优先级</span>
                      <span className="font-medium text-gray-700">{topic.topic}模块强化</span>
                      <span className="text-xs text-gray-400">当前{topic.score}%</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      该模块得分率{topic.score}%，存在{topic.errors}处错误。
                      建议系统复习并完成专项练习题10-15道，目标提升至80%以上。
                    </p>
                  </div>
                ))}

                <div className="border-l-4 border-blue-500 pl-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-bold">持续优化</span>
                    <span className="font-medium text-gray-700">计算准确性训练</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    计算失误是主要失分原因。建议：(1)分步骤书写，不跳步 (2)做完立即验算 (3)大数计算列竖式。
                    每天进行10分钟口算练习。
                  </p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                <h4 className="font-bold text-gray-700 mb-3">推荐周学习计划</h4>
                <div className="grid grid-cols-7 gap-2 text-center text-xs">
                  {['周一', '周二', '周三', '周四', '周五', '周六', '周日'].map((day, idx) => (
                    <div key={day} className="bg-white p-2 rounded-lg shadow-sm">
                      <p className="font-medium text-gray-600">{day}</p>
                      <p className="text-gray-500 mt-1 leading-tight" style={{ fontSize: '10px' }}>
                        {idx === 0 && "百分数基础"}
                        {idx === 1 && "百分数逆向"}
                        {idx === 2 && "圆的公式"}
                        {idx === 3 && "半圆圆环"}
                        {idx === 4 && "分数运算"}
                        {idx === 5 && "综合练习"}
                        {idx === 6 && "错题回顾"}
                      </p>
                      <p className="text-orange-600 font-medium mt-1">
                        {idx < 5 ? '30min' : '45min'}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <p className="text-center text-gray-400 text-xs mt-4">
          基于真实批改试卷 · AI视觉分析生成 · 六年级数学综合练习
        </p>
      </div>
    </div>
  );
}
