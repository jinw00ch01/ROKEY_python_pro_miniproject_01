from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        ('students', '0001_initial'),
        ('courses', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Grade',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('score', models.FloatField()),
                ('max_score', models.FloatField(default=100.0)),
                ('grade_type', models.CharField(choices=[('exam', 'Exam'), ('quiz', 'Quiz'), ('assignment', 'Assignment'), ('project', 'Project'), ('midterm', 'Midterm'), ('final', 'Final')], default='exam', max_length=50)),
                ('semester', models.CharField(max_length=20)),
                ('comments', models.TextField(blank=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('course', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='grades', to='courses.course')),
                ('student', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='grades', to='students.student')),
            ],
            options={
                'db_table': 'grades',
                'ordering': ['-created_at'],
            },
        ),
    ]


