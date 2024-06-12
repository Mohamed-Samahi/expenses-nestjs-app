import { Body, Controller, Delete, Get, Param, Post, Put, HttpCode } from "@nestjs/common";

import { ReportType } from "./data";
import { AppService } from "./app.service";

@Controller('report/:reportType')
export class AppController {

  constructor(private readonly appService: AppService) { }

  @Get()
  getAllReports(@Param('reportType') reportType: ReportType) {
    if (reportType != ReportType.EXPENCE && reportType != ReportType.INCOME) return false;
    return this.appService.getAllReports(reportType);
  }

  @Get(':id')
  getReportById(
    @Param('reportType') reportType: ReportType,
    @Param('id') id: string,
  ) {
    if (reportType != ReportType.EXPENCE && reportType != ReportType.INCOME) return false;

    return this.appService.getReportById(reportType, id);
  }

  @Post()
  createReport(
    @Param('reportType') reportType: ReportType,
    @Body() { amount, source }: {
      amount: number,
      source: string,
    }
  ) {
    if (reportType != ReportType.EXPENCE && reportType != ReportType.INCOME) return false;

    return this.appService.createReport(reportType, { amount: 1255, source: "asdfasdf" });
  }

  @Put(":id")
  updateReport(
    @Param('reportType') reportType: ReportType,
    @Param('id') id: string,
    @Body() body: {
      amount: number,
      source: string,
    }
  ) {
    if (reportType != ReportType.EXPENCE && reportType != ReportType.INCOME) return false;

    return this.appService.updateReport(reportType, id, body);
  }

  @HttpCode(204)
  @Delete(":id")
  deleteReport(
    @Param('reportType') reportType: ReportType,
    @Param('id') id: string,
  ) {
    if (reportType != ReportType.EXPENCE && reportType != ReportType.INCOME) return false;

    return this.appService.deleteReport(id);
  }
}