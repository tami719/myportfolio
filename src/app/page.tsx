'use client';

import React, { useState, useEffect } from 'react';
import Head from 'next/head'; 
import styles from './page.module.css';
import { FaEnvelope, FaGithub, FaAngleUp, FaAddressCard, FaLaptop, FaPaperclip, FaGlobe, FaLightbulb, FaGraduationCap } from 'react-icons/fa'; // アイコンをインポート
import { FaGoogleScholar } from "react-icons/fa6";
import { AiOutlineX } from "react-icons/ai";

function Snowfall() {
  useEffect(() => {
    const canvas = document.getElementById('snowfall') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    if (!canvas || !ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const snowflakes: { x: number; y: number; r: number; d: number }[] = [];
    const maxFlakes = 100;

    for (let i = 0; i < maxFlakes; i++) {
      snowflakes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 4 + 1,
        d: Math.random() * maxFlakes,
      });
    }

    const drawSnowflakes = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'white';
      ctx.beginPath();
      for (let i = 0; i < maxFlakes; i++) {
        const flake = snowflakes[i];
        ctx.moveTo(flake.x, flake.y);
        ctx.arc(flake.x, flake.y, flake.r, 0, Math.PI * 2, true);
      }
      ctx.fill();
      updateSnowflakes();
    };

    const updateSnowflakes = () => {
      for (let i = 0; i < maxFlakes; i++) {
        const flake = snowflakes[i];
        flake.y += Math.cos(flake.d) + 1 + flake.r / 2;
        flake.x += Math.sin(flake.d);

        if (flake.y > canvas.height) {
          snowflakes[i] = { x: Math.random() * canvas.width, y: 0, r: flake.r, d: flake.d };
        }
      }
    };

    const animateSnowfall = () => {
      drawSnowflakes();
      requestAnimationFrame(animateSnowfall);
    };

    animateSnowfall();
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return <canvas id="snowfall" className={styles.snowfall}></canvas>;
}


export default function Page() {
  const [popupContent, setPopupContent] = useState<string | null>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const handleProjectClick = (content: string) => {
    setPopupContent(content);
  };

  const closePopup = () => {
    setPopupContent(null);
  };
  
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
    {/* <Head>
      <title>Takumi Ohashi Portfolio</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content="Takumi Ohashi's portfolio website." />
    </Head> */}

    <div className={styles.container}>
      <Snowfall />
      <header className={styles.header}>
        <h1 className={styles.title}>Takumi Ohashi</h1>
        <p className={styles.subtitle}><FaEnvelope className={styles.icon} />takumi.ohashi.4g@stu.hosei.ac.jp</p>
        <div className={styles.socialLinks}>
          <a href="https://github.com/tami719" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <FaGithub size={30} />
          </a>
          <a href="https://x.com/tami__mila" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <AiOutlineX size={30} />
          </a>
          <a href="https://scholar.google.com/citations?hl=ja&user=wYNuFFIAAAAJ" target="_blank" rel="noopener noreferrer" aria-label="Google Scholar">
            <FaGoogleScholar size={30} />
          </a>
        </div>
      </header>
      <main className={styles.main}>
        <section className={styles.section}>
        <h2><FaAddressCard className={styles.icon} />About Me</h2>
        <ul>
            <li>所属: 法政大学大学院 理工学研究科 応用情報工学専攻</li>
            <li>学年: 修士2年 </li>
            <li>研究室: 知的情報処理研究室（彌冨研）</li>
          </ul>
      </section>
      <section className={styles.projects}>
          <h2>- Research -</h2>
          <div className={styles.cardContainer}>
            <div
              className={styles.card}
              onClick={() => scrollToSection('project1')}
            >
              <h3>MTLE / eJCM</h3>
              <p>LLMを用いたデータ拡張手法と<br/>日本語常識道徳データセットの拡張</p>
            </div>
            <div
              className={styles.card}
              onClick={() => scrollToSection('project2')}
            >
              <h3>NINJA</h3>
              <p>日本文化知識データベースの構築</p>
            </div>
          </div>
        </section>

        <section className={styles.research}>
          <h2><FaPaperclip className={styles.icon} />International Conferences</h2>
          <ul className={styles.experienceList}>
            <li>
              <div id="project1" className={styles.experienceItem}>
                <span className={styles.period2}>2024/10</span>
                <div>
                  <strong>CIKM2024 @Boise, USA🇺🇸</strong>
                  <p className={styles.subText}>The 33rd ACM International Conference on Information and Knowledge Management</p>
                  <p>“<span style={{fontWeight: 'bold' }}><a href="https://dl.acm.org/doi/10.1145/3627673.3679924" target="_blank" rel="noopener noreferrer">Extended Japanese Commonsense Morality Dataset with Masked Token and Label Enhancement</a></span>”
                    <br/><span className={styles.author}>Takumi Ohashi</span>, Tsubasa Nakagawa, Hitoshi Iyatomi</p>
                  <p>acceptance rate: <span style={{ color: 'red' }}>26.8</span>%</p>
                  <a href="https://dl.acm.org/doi/10.1145/3627673.3679924" target="_blank" rel="noopener noreferrer"><img alt="ACM Digital Library" src="https://img.shields.io/badge/Accepted-CIKM-0085CA.svg?logo=acm" /></a>{' '}
                  <a href="https://arxiv.org/abs/2410.09564" target="_blank" rel="noopener noreferrer"><img alt="arXiv" src="https://img.shields.io/badge/arXiv-2410.09564-b31b1b.svg" /></a>{' '}
                  <a href="https://github.com/IyatomiLab/extended-jcm" target="_blank" rel="noopener noreferrer"><img alt="GitHub" src="https://img.shields.io/badge/GitHub-REPO-181717?logo=github&logoColor=white" /></a>
                </div>
              </div>
            </li>
            <br/>
          </ul>
        </section>


        <section className={styles.research}>
          <h2><FaPaperclip className={styles.icon} />Domestic Conferences, Presentation 🇯🇵</h2>
          <ul className={styles.experienceList}>
            <li>
              <div className={styles.experienceItem}>
                <span className={styles.period2}>2025/11</span>
                <div>
                  <strong>IBIS2025 @沖縄</strong>
                  <p className={styles.subText}>第28回情報論的学習理論ワークショップ</p>
                  <p>“<span className={styles.titleHighlight}>輪郭保持を考慮した変換による2D撮像FLAIR MRIとfat-saturation 3D撮像FLAIR MRIの調和</span>”
                    <br/>秋葉裕貴, 西牧慧, <span className={styles.author}>大橋巧</span>, 友重秀平, 大石健一, 彌冨仁</p>
                  <p>“<span className={styles.titleHighlight}>読後感スコアとLLMを活用した主観的文学作品検索</span>”
                    <br/>伊藤達也, 竹下理斗, <span className={styles.author}>大橋巧</span>, 福田由紀, 彌冨仁</p>
                </div>
              </div>
            </li>
            <li>
              <div className={styles.experienceItem}>
                <span className={styles.period2}>2025/09</span>
                <div>
                  <strong>YANS2025 @浜松</strong>
                  <p className={styles.subText}>第20回言語処理若手シンポジウム</p>
                  <p>“<span className={styles.titleHighlight}>文化的影響を定量化する評価指標の提案</span>” <span className={styles.author}>大橋巧</span>, 彌冨仁</p>
                  <p>“<span className={styles.titleHighlight}>ローカルLLMを用いたAIエージェントの現状と課題</span>” 竹下理斗, 川田拓朗, <span className={styles.author}>大橋巧</span>, 北田俊輔, 彌冨仁</p>
                </div>
              </div>
            </li>
          <li>
              <div id="project2" className={styles.experienceItem}>
                <span className={styles.period2}>2025/03</span>
                <div>
                  <strong>NLP2025 @長崎</strong>
                  <p className={styles.subText}>言語処理学会第31回年次大会</p>
                  <p>“<span style={{fontWeight: 'bold' }}><a href="https://www.anlp.jp/proceedings/annual_meeting/2025/pdf_dir/P6-18.pdf" target="_blank" rel="noopener noreferrer">LLM から抽出した日本文化知識のデータベース構築と活用</a></span>” <span className={styles.author}>大橋巧</span>, 彌冨仁</p>
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
                  <p>“<span style={{fontWeight: 'bold' }}><a href="https://www.anlp.jp/proceedings/annual_meeting/2024/pdf_dir/P8-5.pdf" target="_blank" rel="noopener noreferrer">ChatGPT による日本語常識道徳データセットの拡張</a></span>” <span className={styles.author}>大橋巧</span>, 中川翼, 彌冨仁</p>
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
                  <p>“<span className={styles.titleHighlight}>AIに必要な人間の一般的な道徳観の獲得</span>” <span className={styles.author}>大橋巧</span>, 中川翼, 彌冨仁</p>
                </div>
              </div>
            </li>
            <br/>
          </ul>
        </section>

        <section className={styles.research}>
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
                  <p className={styles.subText}><a href="https://signate.jp/competitions/936" target="_blank" rel="noopener noreferrer">ブルーカーボン・ダイナミクスを可視化せよ！</a></p>
                  <p>提供されたテーブルデータとLightGBMを用い、簡単なモデルを構築し、パラメータチューニングを行った。<br/>391人中51位で銅メダル🥉を獲得した。</p>
                </div>
              </div>
            </li>
          </ul>
        </section>
        <section className={styles.languages}>
          <h2><FaGlobe className={styles.icon} />Languages & Qualifications</h2>
          <ul>
            <li>日本語（ネイティブ）</li>
            <li>英語（簡単な日常会話レベル）</li>
            <li>基本情報技術者試験 合格（2022年12月）</li>
            <li>普通自動車第一種免許 取得（2021年7月）</li>
          </ul>
        </section>

        <section className={styles.education}>
          <h2><FaGraduationCap className={styles.icon} />Education</h2>
          <ul>
            <li>法政大学大学院 理工学研究科 応用情報工学専攻（2026年修了見込）</li>
            <li>法政大学 理工学部 応用情報工学科（2024年卒業）</li>
          </ul>
        </section>
      </main>
      <footer className={styles.footer}>
        <p>&copy; 2025 Takumi Ohashi. All rights reserved.</p>
      </footer>

      {popupContent && (
        <div className={styles.popup} onClick={closePopup}>
          <div className={styles.popupContent}>
            <p>{popupContent}</p>
            <button className={styles.closeButton} onClick={closePopup}>
              Close
            </button>
          </div>
        </div>
      )}

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

