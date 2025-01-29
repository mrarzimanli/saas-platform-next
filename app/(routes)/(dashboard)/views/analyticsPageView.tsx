"use client";
import styles from "../shared/styles/analytics.module.scss";
import classNames from "classnames";
import ReactECharts from "echarts-for-react";
import { useAuth } from "@/providers/AuthProvider";
import { usePlanById } from "@/(routes)/(auth)/api/plans/queries";
import { Performance, Post, Reels } from "../shared/types";
import { useAnalytics } from "../api/analytics/queries";
import Skeleton from "react-loading-skeleton";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

export default function AnalyticsPageView() {
  const tWidgets = useTranslations("widgets");
  const { auth, handleUpgradePlan } = useAuth();

  const { data: plan, isLoading: isPlanLoading } = usePlanById(auth?.user?.subscription?.planId);

  const features = plan?.features || [];
  const results = useAnalytics(features);

  const isLoading = results.some((result) => result.isLoading);

  const posts = results?.[0]?.data?.data;
  const reels = results?.[1]?.data?.data;
  const performances = results?.[2]?.data?.data;
  const audienceByGender = results?.[3]?.data?.data;
  const audienceByAge = results?.[4]?.data?.data;
  const audienceByCountries = results?.[5]?.data?.data;
  const audienceByCities = results?.[6]?.data?.data;

  useEffect(() => {
    if (auth?.user?.subscription?.status === "canceled") {
      handleUpgradePlan();
    }
  }, [plan]);

  return (
    <div className={styles.page}>
      <div className={styles.widget}>
        <div className={styles.widget__header}>
          <div className={styles.widget__header__content}>
            <span className={styles.widget__header__title}>{tWidgets("pagePerformance.title")}</span>
            <p className={styles.widget__header__desc}>{tWidgets("pagePerformance.description")}</p>
          </div>
        </div>
        <div className={styles.widget__body}>
          {isLoading ? (
            <Skeleton height={208} />
          ) : (
            <div className={styles.statsWrapper}>
              {performances?.length > 0 &&
                performances.map((performance: Performance) => (
                  <div
                    className={styles.stat}
                    key={performance?.id}
                  >
                    <span className={styles.stat__title}>{performance?.name}</span>
                    <span className={styles.stat__value}>
                      {performance?.value}
                      {performance?.difference?.unit}
                    </span>
                    {performance?.difference?.amount !== 0 && (
                      <span className={classNames(styles.stat__label, performance?.difference?.amount > 0 ? styles.success : styles.danger)}>
                        {performance?.difference?.amount}
                        {performance?.difference?.unit}
                      </span>
                    )}
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>

      <div className={styles.widget}>
        <div className={styles.widget__body}>
          <div className={styles.widgetsWrapper}>
            <div className={styles.widget}>
              <div className={styles.widget__header}>
                <div className={styles.widget__header__content}>
                  <span className={styles.widget__header__title}>{tWidgets("audienceByGender.title")}</span>
                </div>
              </div>
              <div className={styles.widget__body}>
                {isLoading ? (
                  <Skeleton height={452} />
                ) : (
                  <div className={styles.chart}>
                    {audienceByGender?.length > 0 && (
                      <ReactECharts
                        option={audienceByGender[0]}
                        style={{ height: "420px", width: "100%" }}
                      />
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className={styles.widget}>
              <div className={styles.widget__header}>
                <div className={styles.widget__header__content}>
                  <span className={styles.widget__header__title}>{tWidgets("audienceByAge.title")}</span>
                </div>
              </div>

              <div className={styles.widget__body}>
                {isLoading ? (
                  <Skeleton height={452} />
                ) : (
                  <div className={styles.chart}>
                    {audienceByAge?.length > 0 && (
                      <ReactECharts
                        option={audienceByAge[0]}
                        style={{ height: "420px", width: "100%" }}
                      />
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className={styles.widget}>
              <div className={styles.widget__header}>
                <div className={styles.widget__header__content}>
                  <span className={styles.widget__header__title}>{tWidgets("topCountries.title")}</span>
                </div>
              </div>

              <div className={styles.widget__body}>
                {isLoading ? (
                  <Skeleton height={452} />
                ) : (
                  <div className={styles.chart}>
                    {audienceByCountries?.length > 0 && (
                      <ReactECharts
                        option={audienceByCountries[0]}
                        style={{ height: "420px", width: "100%" }}
                      />
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className={styles.widget}>
              <div className={styles.widget__header}>
                <div className={styles.widget__header__content}>
                  <span className={styles.widget__header__title}>{tWidgets("topCities.title")}</span>
                </div>
              </div>

              <div className={styles.widget__body}>
                {isLoading ? (
                  <Skeleton height={452} />
                ) : (
                  <div className={styles.chart}>
                    {audienceByCities?.length > 0 && (
                      <ReactECharts
                        option={audienceByCities[0]}
                        style={{ height: "420px", width: "100%" }}
                      />
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.widget}>
        <div className={styles.widget__header}>
          <div className={styles.widget__header__content}>
            <span className={styles.widget__header__title}>{tWidgets("posts.title")}</span>
            <p className={styles.widget__header__desc}>{tWidgets("posts.description")}</p>
          </div>
        </div>
        <div className={styles.widget__body}>
          {isLoading ? (
            <Skeleton height={208} />
          ) : (
            <div className={styles.tableContainer}>
              <div className={styles.table}>
                <table>
                  <thead>
                    <tr>
                      <th>№</th>
                      <th>Likes</th>
                      <th>Reach</th>
                      <th>Saved</th>
                      <th>Shares</th>
                      <th>Comments</th>
                      <th>Impressions</th>
                      <th>Video views</th>
                      <th>Engagement rate</th>
                      <th>Total interactions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {posts?.length > 0 &&
                      posts.map((post: Post, index: number) => (
                        <tr key={index}>
                          <td>#{index + 1}</td>
                          <td>{post?.metric?.likes || 0}</td>
                          <td>{post?.metric?.reach || 0}</td>
                          <td>{post?.metric?.saved || 0}</td>
                          <td>{post?.metric?.shares || 0}</td>
                          <td>{post?.metric?.comments || 0}</td>
                          <td>{post?.metric?.impressions || 0}</td>
                          <td>{post?.metric?.video_views || 0}</td>
                          <td>{post?.metric?.engagement_rate || 0}</td>
                          <td>{post?.metric?.total_interactions || 0}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className={styles.widget}>
        <div className={styles.widget__header}>
          <div className={styles.widget__header__content}>
            <span className={styles.widget__header__title}>{tWidgets("reels.title")}</span>
            <p className={styles.widget__header__desc}>{tWidgets("reels.description")}</p>
          </div>
        </div>
        <div className={styles.widget__body}>
          {isLoading ? (
            <Skeleton height={452} />
          ) : (
            <div className={styles.tableContainer}>
              <div className={styles.table}>
                <table>
                  <thead>
                    <tr>
                      <th>№</th>
                      <th>Likes</th>
                      <th>Plays</th>
                      <th>Reach</th>
                      <th>Saved</th>
                      <th>Shares</th>
                      <th>Comments</th>
                      <th>Engagement rate</th>
                      <th>Total interactions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reels?.length > 0 &&
                      reels.map((reels: Reels, index: number) => (
                        <tr key={index}>
                          <td>#{index + 1}</td>
                          <td>{reels?.metric?.likes || 0}</td>
                          <td>{reels?.metric?.plays || 0}</td>
                          <td>{reels?.metric?.reach || 0}</td>
                          <td>{reels?.metric?.saved || 0}</td>
                          <td>{reels?.metric?.shares || 0}</td>
                          <td>{reels?.metric?.comments || 0}</td>
                          <td>{reels?.metric?.engagement_rate || 0}</td>
                          <td>{reels?.metric?.total_interactions || 0}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
