-- Sample seed data for local development
-- 宇宙に関する最新ニュースのモックデータ

INSERT INTO articles (title, description, link, published_at, source) VALUES
(
    'はやぶさ2、新たな小惑星探査ミッション開始',
    'JAXA（宇宙航空研究開発機構）は、小惑星探査機「はやぶさ2」が新たな小惑星1998 KY26の観測ミッションを開始したと発表しました。',
    'https://example.com/jaxa/hayabusa2-new-mission',
    '2024-01-15 10:00:00+09',
    'JAXA'
),
(
    '国際宇宙ステーション、新実験モジュール設置完了',
    'ISSに新しい実験モジュール「きぼう2」の設置が完了し、微小重力環境での材料実験が開始されます。',
    'https://example.com/jaxa/iss-new-module',
    '2024-01-14 15:30:00+09',
    'JAXA'
),
(
    'H3ロケット試験機2号機、打ち上げ成功',
    '次世代基幹ロケットH3の試験機2号機が種子島宇宙センターから打ち上げられ、予定の軌道への投入に成功しました。',
    'https://example.com/jaxa/h3-launch-success',
    '2024-01-13 09:00:00+09',
    'JAXA'
),
(
    '月面探査機SLIM、観測データ送信開始',
    '月面着陸に成功した小型月着陸実証機SLIMが、月面の詳細な観測データの送信を開始しました。',
    'https://example.com/jaxa/slim-observation',
    '2024-01-12 14:20:00+09',
    'JAXA'
),
(
    '火星探査ローバー、地下水の証拠を発見',
    'NASAの火星探査ローバー「パーシビアランス」が、過去の地下水活動を示す鉱物の証拠を発見しました。',
    'https://example.com/space/mars-underground-water',
    '2024-01-11 11:45:00+09',
    'NASA'
),
(
    'ジェイムズ・ウェッブ宇宙望遠鏡、最古の銀河を観測',
    'ジェイムズ・ウェッブ宇宙望遠鏡が、ビッグバンから3億年後の最古級の銀河を観測することに成功しました。',
    'https://example.com/space/webb-ancient-galaxy',
    '2024-01-10 16:00:00+09',
    'NASA'
),
(
    '民間宇宙船、初の商業宇宙旅行実施',
    'スペースX社の有人宇宙船が、民間人4名を乗せた初の商業宇宙旅行ミッションを無事完了しました。',
    'https://example.com/space/commercial-space-travel',
    '2024-01-09 12:30:00+09',
    'SpaceX'
),
(
    '小惑星「りゅうぐう」サンプル、新たな有機物発見',
    'はやぶさ2が持ち帰った小惑星「りゅうぐう」のサンプル分析で、これまで知られていなかった有機化合物が発見されました。',
    'https://example.com/jaxa/ryugu-organic-compounds',
    '2024-01-08 13:15:00+09',
    'JAXA'
),
(
    '太陽フレア観測衛星「ひので」、巨大フレア捉える',
    '太陽観測衛星「ひので」が、過去10年で最大級の太陽フレアの発生メカニズムを詳細に観測しました。',
    'https://example.com/jaxa/hinode-solar-flare',
    '2024-01-07 10:45:00+09',
    'JAXA'
),
(
    '欧州宇宙機関、木星探査機JUICEの運用開始',
    'ESAの木星氷衛星探査計画JUICEが本格的な観測運用を開始し、木星とその衛星の詳細な調査を開始します。',
    'https://example.com/space/juice-jupiter-mission',
    '2024-01-06 14:00:00+09',
    'ESA'
),
(
    'SpaceX、スターシップの軌道飛行試験に成功',
    'スターシップの最新試験機が初めて地球周回軌道への投入に成功し、次世代有人宇宙船開発の大きな前進となりました。',
    'https://example.com/spacex/starship-orbital-test',
    '2024-01-05 09:30:00+09',
    'SpaceX'
),
(
    '中国の月面基地建設計画、詳細公開',
    '中国国家航天局が2030年代の月面研究ステーション建設計画の詳細を公開し、国際協力を呼びかけました。',
    'https://example.com/space/china-lunar-base',
    '2024-01-04 15:20:00+09',
    'CNSA'
),
(
    'インドの太陽観測衛星、コロナの新現象を観測',
    'インド初の太陽観測衛星Aditya-L1が、太陽コロナの新しい加熱メカニズムを示唆する現象を観測しました。',
    'https://example.com/space/india-solar-observation',
    '2024-01-03 11:00:00+09',
    'ISRO'
),
(
    'アルテミス計画、月面着陸地点を正式決定',
    'NASAのアルテミス計画で、有人月面着陸の候補地が南極付近の3地点に絞られたことが発表されました。',
    'https://example.com/nasa/artemis-landing-site',
    '2024-01-02 16:45:00+09',
    'NASA'
),
(
    '金星探査機「あかつき」、大気循環の新発見',
    'JAXAの金星探査機「あかつき」が、金星の大気スーパーローテーションの新しいメカニズムを発見しました。',
    'https://example.com/jaxa/akatsuki-venus-atmosphere',
    '2024-01-01 10:00:00+09',
    'JAXA'
)
ON CONFLICT (link) DO NOTHING;
