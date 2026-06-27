'use client';

import React, { useState, useEffect } from 'react';
import { M_PLUS_1p } from 'next/font/google';
import styles from './page.module.css';
import { FaEnvelope, FaGithub, FaAngleUp, FaAddressCard, FaLaptop, FaPaperclip, FaGlobe, FaTag, FaUser, FaGraduationCap } from 'react-icons/fa';
import { FaGoogleScholar } from "react-icons/fa6";
import { AiOutlineX } from "react-icons/ai";
import Snowfall from './components/Snowfall';
import Sakurafall from './components/Sakurafall';
import Fireworks from './components/Fireworks';
import Momojifall from './components/Momojifall';

type AnimationMode = 'snow' | 'sakura' | 'firework' | 'momoji';

function getDefaultAnimationMode(date: Date): AnimationMode {
  const month = date.getMonth() + 1;

  if (month >= 3 && month <= 5) return 'sakura';
  if (month >= 6 && month <= 8) return 'firework';
  if (month >= 9 && month <= 11) return 'momoji';
  return 'snow';
}

const bodyFont = M_PLUS_1p({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-body',
});

const headingFont = M_PLUS_1p({
  weight: ['500', '700'],
  subsets: ['latin'],
  variable: '--font-heading',
});

const socialLinks = [
  { href: 'https://github.com/tami719', label: 'GitHub', icon: FaGithub },
  { href: 'https://x.com/tami__mila', label: 'Twitter', icon: AiOutlineX },
  { href: 'https://scholar.google.com/citations?hl=ja&user=wYNuFFIAAAAJ', label: 'Google Scholar', icon: FaGoogleScholar },
];

const projectCards = [
  {
    id: 'project1',
    title: 'eJCM',
    description: (
      <>
        LLMを用いたデータ拡張手法と
        <br />
        日本語常識道徳データセットの拡張
      </>
    ),
  },
  {
    id: 'project2',
    title: 'NINJA',
    description: '日本文化知識データベースの構築',
  },
  {
    id: 'project3',
    title: 'CCI',
    description: (
      <>
        任意の文に対して
        <br />
        文化特有性を推定する尺度
      </>
    ),
  },
] as const;

const animationOptions: { value: AnimationMode; label: string }[] = [
  { value: 'snow', label: 'Winter' },
  { value: 'sakura', label: 'Spring' },
  { value: 'firework', label: 'Summer' },
  { value: 'momoji', label: 'Autumn' },
];

const seasonalBackgrounds: Record<AnimationMode, React.ReactNode> = {
  snow: <Snowfall />,
  sakura: <Sakurafall />,
  firework: <Fireworks />,
  momoji: <Momojifall />,
};


export default function Page() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [animationMode, setAnimationMode] = useState<AnimationMode>(() => getDefaultAnimationMode(new Date()));
  
  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
    <div className={`${styles.container} ${bodyFont.variable} ${headingFont.variable}`}>
      {seasonalBackgrounds[animationMode]}
      <header className={styles.header}>
        <h1 className={styles.title}>Takumi Ohashi</h1>
        <p className={styles.subtitle}><FaEnvelope className={styles.icon} />takumi.ohashi.4g@gmail.com</p>
        <div className={styles.socialLinks}>
          {socialLinks.map(({ href, label, icon: Icon }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
              <Icon size={30} />
            </a>
          ))}
        </div>
      </header>
      <main className={styles.main}>
        <section className={styles.section}>
        <h2><FaAddressCard className={styles.icon} />About Me</h2>
        <ul>
            <li>所属: 法政大学大学院 理工学研究科 応用情報工学専攻</li>
            {/* <li>学年: 修士2年 </li> */}
            <li>研究室: 知的情報処理研究室（彌冨研）</li>
          </ul>
      </section>
      <section className={styles.projects}>
          <h2>- Research -</h2>
          <div className={styles.cardContainer}>
            {projectCards.map(({ id, title, description }) => (
              <div key={id} className={styles.card} onClick={() => scrollToSection(id)}>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2><FaPaperclip className={styles.icon} />International Conferences</h2>
          <ul className={styles.experienceList}>
            <li>
              <div className={styles.experienceItem}>
                <span className={styles.period2}>2026/07</span>
                <div>
                  <strong>ACL 2026 SRW @San Diego, United States 🇺🇸</strong>
                  <p className={styles.subText}>The 64th Annual Meeting of the Association for Computational Linguistics: Student Research Workshop</p>
                  <p><FaTag className={styles.icon} />“<span className={styles.titleHighlight}><a href="https://aclanthology.org/2026.acl-srw.50/" target="_blank" rel="noopener noreferrer">A11y-Compressor: A Framework for Enhancing the Efficiency of GUI Agent Observations through Visual Context Reconstruction and Redundancy Reduction</a></span>”
                    <br/><FaUser className={styles.icon} /> Michito Takeshita, Takuro Kawada, <span className={styles.author}>Takumi Ohashi</span>, Shunsuke Kitada, Hitoshi Iyatomi</p>
                  <p>acceptance rate: 34.7%</p>
                  <a href="https://aclanthology.org/2026.acl-srw.50/" target="_blank" rel="noopener noreferrer"><img alt="ACL Anthology" src="https://img.shields.io/badge/Accepted-ACL_SRW-0085CA.svg" /></a>{' '}
                  <a href="https://arxiv.org/abs/2605.00551" target="_blank" rel="noopener noreferrer"><img alt="arXiv" src="https://img.shields.io/badge/arXiv-2605.00551-b31b1b.svg?logo=arxiv&logoColor=white" /></a>{' '}
                </div>
              </div>
            </li>
            <li>
              <div id="project3" className={styles.experienceItem}>
                <span className={styles.period2}>2026/03</span>
                <div>
                  <strong>EACL 2026 Workshop @Rabat, Morocco 🇲🇦</strong>
                  <p className={styles.subText}>The First Workshop on Multilingual Multicultural Evaluation</p>
                  <p><FaTag className={styles.icon} />“<span className={styles.titleHighlight}><a href="https://aclanthology.org/2026.mme-main.5/" target="_blank" rel="noopener noreferrer">Conceptual Cultural Index: A Metric for Cultural Specificity via Relative Generality</a></span>”
                    <br/><FaUser className={styles.icon} /> <span className={styles.author}>Takumi Ohashi</span>, Hitoshi Iyatomi</p>
                  <p>acceptance rate: 55.6%</p>
                  <a href="https://aclanthology.org/2026.mme-main.5/" target="_blank" rel="noopener noreferrer"><img alt="ACL Anthology" src="https://img.shields.io/badge/Accepted-EACL_MME-0085CA.svg" /></a>{' '}
                  <a href="https://arxiv.org/abs/2602.09444" target="_blank" rel="noopener noreferrer"><img alt="arXiv" src="https://img.shields.io/badge/arXiv-2602.09444-b31b1b.svg?logo=arxiv&logoColor=white" /></a>{' '}
                  <a href="https://github.com/IyatomiLab/CCI" target="_blank" rel="noopener noreferrer"><img alt="GitHub" src="https://img.shields.io/badge/GitHub-CCI-181717?logo=github&logoColor=white" /></a>
                </div>
              </div>
            </li>
            <li>
              <div className={styles.experienceItem}>
                <span className={styles.period2}>2026/02</span>
                <div>
                  <strong>SPIE Medical Imaging 2026 @Vancouver, Canada 🇨🇦</strong>
                  <p className={styles.subText}>SPIE Medical Imaging 2026: Image Processing</p>
                  <p><FaTag className={styles.icon} />“<span className={styles.titleHighlight}><a href="https://spie.org/medical-imaging/presentation/Harmonizing-2D-and-fatsaturated-3D-FLAIR-with-contourpreserving-transfer/13925-53" target="_blank" rel="noopener noreferrer">Harmonizing 2D and fat-saturated 3D FLAIR with contour-preserving transfer</a></span>”
                    <br/><FaUser className={styles.icon} /> Yuki Akiba, Kei Nishimaki, <span className={styles.author}>Takumi Ohashi</span>, Shuhei Tomoshige, Kenichi Oishi, Hitoshi Iyatomi</p>
                  <p></p>
                  <a href="https://www.spiedigitallibrary.org/conference-proceedings-of-spie/13925/139251J/Harmonizing-2D-and-fatsaturated-3D-FLAIR-with-contourpreserving-transfer/10.1117/12.3085726.short" target="_blank" rel="noopener noreferrer"><img alt="SPIE" src="https://img.shields.io/badge/Accepted-SPIE-0085CA.svg" /></a>{' '}
                </div>
              </div>
            </li>
            <li>
              <div id="project1" className={styles.experienceItem}>
                <span className={styles.period2}>2024/10</span>
                <div>
                  <strong>CIKM 2024 @Boise, United States 🇺🇸</strong>
                  <p className={styles.subText}>The 33rd ACM International Conference on Information and Knowledge Management</p>
                  <p><FaTag className={styles.icon} />“<span className={styles.titleHighlight}><a href="https://dl.acm.org/doi/10.1145/3627673.3679924" target="_blank" rel="noopener noreferrer">Extended Japanese Commonsense Morality Dataset with Masked Token and Label Enhancement</a></span>”
                    <br/><FaUser className={styles.icon} /> <span className={styles.author}>Takumi Ohashi</span>, Tsubasa Nakagawa, Hitoshi Iyatomi</p>
                  <p>acceptance rate: <span style={{ color: 'red' }}>26.8</span>%</p>
                  <a href="https://dl.acm.org/doi/10.1145/3627673.3679924" target="_blank" rel="noopener noreferrer"><img alt="ACM Digital Library" src="https://img.shields.io/badge/Accepted-CIKM-0085CA.svg?logo=acm" /></a>{' '}
                  <a href="https://arxiv.org/abs/2410.09564" target="_blank" rel="noopener noreferrer"><img alt="arXiv" src="https://img.shields.io/badge/arXiv-2410.09564-b31b1b.svg?logo=arxiv&logoColor=white" /></a>{' '}
                  <a href="https://github.com/IyatomiLab/extended-jcm" target="_blank" rel="noopener noreferrer"><img alt="GitHub" src="https://img.shields.io/badge/GitHub-eJCM-181717?logo=github&logoColor=white" /></a>
                </div>
              </div>
            </li>
            <br/>
          </ul>
        </section>


        <section className={styles.section}>
          <h2><FaPaperclip className={styles.icon} />Domestic Conferences & Presentation 🇯🇵</h2>
          <ul className={styles.experienceList}>
            <li>
              <div className={styles.experienceItem}>
                <span className={styles.period2}>2026/03</span>
                <div>
                  <strong>NLP2026 @宇都宮</strong>
                  <p className={styles.subText}>言語処理学会第32回年次大会</p>
                  <hr className={styles.divider}></hr>
                  <p><FaTag className={styles.icon} />“<span className={styles.titleHighlight}>Conceptual Cultural Index: 相対的一般性に基づく文化特有性の尺度</span>”
                    <br/><FaUser className={styles.icon} /> <span className={styles.author}>大橋巧</span>, 彌冨仁</p>
                  <hr className={styles.divider}></hr>
                  <p><FaTag className={styles.icon} />“<span className={styles.titleHighlight}>日本語常識道徳データセットにおける情報欠損検出・文脈補完の自動化検証</span>”
                    <br/><FaUser className={styles.icon} /> 伊藤達也, <span className={styles.author}>大橋巧</span>, 彌冨仁</p>
                  <hr className={styles.divider}></hr>
                  <p><FaTag className={styles.icon} />“<span className={styles.titleHighlight}>Compressed-a11y: 視覚的文脈の再構成と冗長性削減による GUI エージェント観測の効率化</span>”
                    <br/><FaUser className={styles.icon} /> 竹下理斗, 川田拓朗, <span className={styles.author}>大橋巧</span>, 北田俊輔, 彌冨仁</p>
                  <hr className={styles.divider}></hr>
                </div>
              </div>
            </li>
            <li>
              <div className={styles.experienceItem}>
                <span className={styles.period2}>2025/11</span>
                <div>
                  <strong>IBIS2025 @沖縄</strong>
                  <p className={styles.subText}>第28回情報論的学習理論ワークショップ</p>
                  <hr className={styles.divider}></hr>
                  <p><FaTag className={styles.icon} />“<span className={styles.titleHighlight}>輪郭保持を考慮した変換による2D撮像FLAIR MRIとfat-saturation 3D撮像FLAIR MRIの調和</span>”
                    <br/><FaUser className={styles.icon} /> 秋葉裕貴, 西牧慧, <span className={styles.author}>大橋巧</span>, 友重秀平, 大石健一, 彌冨仁</p>
                  <hr className={styles.divider}></hr>
                  <p><FaTag className={styles.icon} />“<span className={styles.titleHighlight}>読後感スコアとLLMを活用した主観的文学作品検索</span>”
                    <br/><FaUser className={styles.icon} /> 伊藤達也, 竹下理斗, <span className={styles.author}>大橋巧</span>, 福田由紀, 彌冨仁</p>
                  <hr className={styles.divider}></hr>
                </div>
              </div>
            </li>
            <li>
              <div className={styles.experienceItem}>
                <span className={styles.period2}>2025/09</span>
                <div>
                  <strong>YANS2025 @浜松</strong>
                  <p className={styles.subText}>第20回言語処理若手シンポジウム</p>
                  <hr className={styles.divider}></hr>
                  <p><FaTag className={styles.icon} />“<span className={styles.titleHighlight}>文化的影響を定量化する評価指標の提案</span>”
                    <br/><FaUser className={styles.icon} /> <span className={styles.author}>大橋巧</span>, 彌冨仁</p>
                  <hr className={styles.divider}></hr>
                  <p><FaTag className={styles.icon} />“<span className={styles.titleHighlight}>ローカルLLMを用いたAIエージェントの現状と課題</span>”
                    <br/><FaUser className={styles.icon} /> 竹下理斗, 川田拓朗, <span className={styles.author}>大橋巧</span>, 北田俊輔, 彌冨仁</p>
                  <hr className={styles.divider}></hr>
                </div>
              </div>
            </li>
          <li>
              <div id="project2" className={styles.experienceItem}>
                <span className={styles.period2}>2025/03</span>
                <div>
                  <strong>NLP2025 @長崎</strong>
                  <p className={styles.subText}>言語処理学会第31回年次大会</p>
                  <hr className={styles.divider}></hr>
                  <p><FaTag className={styles.icon} />“<span className={styles.titleHighlight}>LLM から抽出した日本文化知識のデータベース構築と活用</span>”
                    <br/><FaUser className={styles.icon} /> <span className={styles.author}>大橋巧</span>, 彌冨仁</p>
                  <hr className={styles.divider}></hr>
                </div>
              </div>
            </li>
            <li>
              <div className={styles.experienceItem}>
                <span className={styles.period3}>2024/11</span>
                <div>
                  <strong>IR Reading 2024秋</strong>
                  <p>ACM SIGIR 東京支部が開催している論文読み会、CIKM&apos;24での自身の研究を発表。</p>
                </div>
              </div>
            </li>
            <li>
              <div className={styles.experienceItem}>
                <span className={styles.period2}>2024/03</span>
                <div>
                  <strong>NLP2024 @神戸</strong>
                  <p className={styles.subText}>言語処理学会第30回年次大会</p>
                  <hr className={styles.divider}></hr>
                  <p><FaTag className={styles.icon} />“<span className={styles.titleHighlight}>ChatGPT による日本語常識道徳データセットの拡張</span>”
                    <br/><FaUser className={styles.icon} /> <span className={styles.author}>大橋巧</span>, 中川翼, 彌冨仁</p>
                  <hr className={styles.divider}></hr>
                </div>
              </div>
            </li>
            <li>
              <div className={styles.experienceItem}>
                <span className={styles.period3}>2024/01</span>
                <div>
                  <strong>法政大学 卒業論文審査会</strong>
                  <p>学部の卒業論文審査会にて、<span style={{ color: 'red', fontWeight: 'bold' }}>卒業論文審査会最優秀賞</span>を受賞。</p>
                </div>
              </div>
            </li>
            <li>
              <div className={styles.experienceItem}>
                <span className={styles.period2}>2023/08</span>
                <div>
                  <strong>YANS2023 @東京</strong>
                  <p className={styles.subText}>NLP若手の会第18回シンポジウム</p>
                  <hr className={styles.divider}></hr>
                  <p><FaTag className={styles.icon} />“<span className={styles.titleHighlight}>AIに必要な人間の一般的な道徳観の獲得</span>”
                    <br/><FaUser className={styles.icon} /> <span className={styles.author}>大橋巧</span>, 中川翼, 彌冨仁</p>
                  <hr className={styles.divider}></hr>
                </div>
              </div>
            </li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2><FaLaptop className={styles.icon} /> Experience</h2>
          <ul className={styles.experienceList}>
           <li>
              <div className={styles.experienceItem}>
                <span className={styles.period}>2025/03</span>
                <div>
                  <strong>富士通株式会社</strong>
                  <p>Fujitsu Professional Internshipに参加し、Salesforceからのドキュメント出力を自動化するツールの機能強化に取り組んだ。【<span><a style={{color: 'red', fontWeight: 'bold' }} href="https://www.openbadge-global.com/api/v1.0/openBadge/v2/Wallet/Public/GetAssertionShare/blN5VDZxaEp6TDFldUxmQThweXNwQT09" target="_blank" rel="noopener noreferrer">open badge</a></span>】</p>
                </div>
              </div>
             </li>
            <li>
              <div className={styles.experienceItem}>
                <span className={styles.period}>2024/09</span>
                <div>
                  <strong>清水建設株式会社 技術研究所</strong>
                  <p>研究員就業体験インターンに1週間参加。AI(NLP)に関する技術検証に取り組んだ。</p>
                </div>
              </div>
            </li>
            <li>
              <div className={styles.experienceItem}>
                <span className={styles.period2}>2024/09</span>
                <div>
                  <strong>YANS2024 @大阪 ハッカソン</strong>
                  <p>YANS2024の中で開催された、「マルチモーダルデータを用いた川柳生成」ハッカソンに参加した。参加者によるライブ人手評価では8チームのうち2位であった。</p>
                </div>
              </div>
            </li>
            <li>
              <div className={styles.experienceItem}>
                <span className={styles.period}>2024/08 ~
                  2024/09</span>
                <div>
                  <strong>株式会社博報堂 / 株式会社博報堂ＤＹメディアパートナーズ</strong>
                  <p>データサイエンスエンジニアインターンに3週間参加（課題実施期間を含む）。個人ワークにて、データ分析課題及びアイデア課題に取り組み、データ分析課題では参加者のうち3位という成績を残した。</p>
                </div>
              </div>
            </li>
            <li>
              <div className={styles.experienceItem}>
                <span className={styles.period}>2024/08</span>
                <div>
                  <strong>株式会社日本総合研究所</strong>
                  <p>DXエンジニアインターンに2日間参加。4人チームでアジャイル開発を実施し、Androidアプリの開発に取り組んだ。</p>
                </div>
              </div>
            </li>
            <li>
              <div className={styles.experienceItem}>
                <span className={styles.period}>2023/07 ~
                  (現在)
                </span>
                <div>
                  <strong>フューチャー株式会社</strong>
                  <p>長期開発インターンにて、AI-OCRを用いた帳票自動読み取りシステムの開発に参加。 データ加工・拡張、画像処理を用いた関数作成・検証、AIモデルの構築・改良など担当している。</p>
                </div>
              </div>
            </li>
            <li>
              <div className={styles.experienceItem}>
                <span className={styles.period3}>2023/02 ~
                  2023/04</span>
                <div>
                  <strong>SIGNATE Competition</strong>
                  <p className={styles.subText}><a className={styles.link} href="https://signate.jp/competitions/936" target="_blank" rel="noopener noreferrer">ブルーカーボン・ダイナミクスを可視化せよ！</a></p>
                  <p>提供されたテーブルデータとLightGBMを用い、簡単なモデルを構築し、パラメータチューニングを行った。<br/>391人中51位で銅メダル🥉を獲得した。</p>
                </div>
              </div>
            </li>
          </ul>
        </section>
        <section className={styles.section}>
          <h2><FaGlobe className={styles.icon} />Languages & Qualifications</h2>
          <ul>
            <li>日本語（ネイティブ）</li>
            <li>英語（簡単な日常会話レベル）</li>
            <li>日商簿記検定試験2級 合格（2026年4月）</li>
            <li>基本情報技術者試験 合格（2022年12月）</li>
            <li>普通自動車第一種免許 取得（2021年7月）</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2><FaGraduationCap className={styles.icon} />Education</h2>
          <ul>
            <li>法政大学大学院 理工学研究科 応用情報工学専攻（2026年修了）</li>
            <li>法政大学 理工学部 応用情報工学科（2024年卒業）</li>
          </ul>
        </section>
      </main>
      <footer className={styles.footer}>
        <p>&copy; 2025-2026 Takumi Ohashi. All rights reserved.</p>
        <div className={styles.modeSwitcher}>
          {animationOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              className={`${styles.modeButton} ${animationMode === option.value ? styles.modeButtonActive : ''}`}
              onClick={() => setAnimationMode(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </footer>

      {showBackToTop && (
        <button
          className={styles.backToTop}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <FaAngleUp size={24} />
        </button>
      )}
    </div>
    </>
  );
}
